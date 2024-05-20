export function getParameterByName(name: string, url?: string) {
    if (!url) url = window.location.href
    name = name.replace(/[\[\]]/g, '\\$&')
    var regex = new RegExp('[?&#]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  }

  //here is the doc https://github.com/supabase/auth-js/blob/dc6cf10dcac016ba4831efdb9b8683bda109dab0/src/lib/helpers.ts#L11