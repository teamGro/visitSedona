export let data = {
  'user-info': {
    'user-name': localStorage.getItem('user-name') || '',
    'user-surname': localStorage.getItem('user-surname') || '',
    'user-patronym': localStorage.getItem('user-patronym') || ''
  },

  'contact-info': {
    'user-tel': localStorage.getItem('user-tel') || '',
    'user-email': localStorage.getItem('user-email') || ''
  },

  'impression-info': {
    title: 'Скорее положительное'
  },

  'attractions-info': {
    bridge: false,
    mountain: false,
    park: false,
    rocks: false
  },

  'emotion-info': {
    text: localStorage.getItem('emotion-info') || null
  }
}
