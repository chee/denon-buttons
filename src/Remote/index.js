import React, {PureComponent} from 'react'
import './index.css'
import Button from '../Button'

const buttons = require('../shared/buttons')

const {
  up,
  down,
  left,
  right,
  back,
  enter,
  option,
  setup,
  info,
  volumeUp,
  volumeDown,
  channelUp,
  channelDown,
  mute,
  power,
  soundMovie,
  soundMusic,
  soundGame,
  soundPure,
  sleep
} = buttons

export default class Remote extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      active: null
    }

    const {
      setMessageHandler,
      sendButton
    } = props

    this.handleMessage = this.handleMessage.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)

    setMessageHandler(this.handleMessage)

    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)

    this.send = {}

    Object.values(buttons).forEach(button => {
      this.send[button] = () => {
        sendButton(button)
        this.setActive(button)
      }
    })
  }

  setActive (active) {
    this.setState({active})
  }

  clearActive () {
    this.setState({active: null})
  }

  handleKeyDown (event) {
    const keys = {
      ArrowUp: up,
      ArrowDown: down,
      ArrowLeft: left,
      ArrowRight: right,
      Enter: enter,
      Backspace: back
    }

    const button = keys[event.key]

    button
      ? this.send[button]()
      : console.log(event)
  }

  handleKeyUp (event) {
    this.clearActive()
  }

  handleMessage (event, message) {
    this.clearActive()
    console.log({event, message})
  }

  render () {
    const {active} = this.state
    return (
      <div
        className='remote'>
        <div className='flexbox'>
          <Button
            isActive={active === up}
            onClick={this.send[up]}>
            ▲
          </Button>
          <Button
            isActive={active === down}
            onClick={this.send[down]}>
            ▼
          </Button>
          <Button
            isActive={active === left}
            onClick={this.send[left]}>
            ◀
          </Button>
          <Button
            isActive={active === right}
            onClick={this.send[right]}>
            ▶
          </Button>
        </div>
        <div className='flexbox'>
          <Button
            isActive={active === back}
            onClick={this.send[back]}>
            ↰ back
          </Button>
          <Button
            isActive={active === enter}
            onClick={this.send[enter]}>
            ↵ enter
          </Button>
        </div>
      </div>
    )
  }
}
