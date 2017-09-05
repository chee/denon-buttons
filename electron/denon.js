const DenonAVR = require('denon-avr')
const {
  up,
  down,
  left,
  right,
  enter,
  back
} = require('../src/shared/buttons')

module.exports = host => {
  // eslint-disable-next-line
  const telnet = new DenonAVR.transports.telnet({
    host,
    debug: true
  })

  const denon = new DenonAVR(telnet)

  denon.connect()

  const send = command => () =>
    denon.send(command.toUpperCase())

  const commands = {
    [up]: send('mncup'),
    [down]: send('mncdn'),
    [left]: send('mnclt'),
    [right]: send('mncrt'),
    [back]: send('mnrtn'),
    [enter]: send('mnent')
  }

  const handleButton = button => {
    commands[button]
      ? commands[button]()
      : console.log(button)
  }

  return new Promise(resolve =>
    denon.on('connect', () =>
      resolve(handleButton)
    )
  )
}
