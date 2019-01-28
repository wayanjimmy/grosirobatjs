import UIkit from 'uikit'

export default function notif({message = 'message here', status = 'primary'}) {
  UIkit.notification({
    message,
    status,
    pos: 'top-right',
    timeout: 3000
  })
}
