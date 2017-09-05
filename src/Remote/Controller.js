import React, {PureComponent} from 'react'
import Remote from '.'

const {ipcRenderer} = window.require('electron')

export default class RemoteController extends PureComponent {
  constructor (...args) {
    super(...args)
    this.state = {
      message: null
    }

    ipcRenderer.on('message', (event, message) => {
      this.setState({message})
      this.handleMessage && this.handleMessage(event, message)
    })

    this.setMessageHandler = this.setMessageHandler.bind(this)
  }

  sendButton (button) {
    ipcRenderer.send('button', button)
  }

  setMessageHandler (handler) {
    this.handleMessage = handler
  }

  render () {
    return (
      <Remote
        setMessageHandler={this.setMessageHandler}
        sendButton={this.sendButton}
        lastMessage={this.state.message}
      />
    )
  }
}
