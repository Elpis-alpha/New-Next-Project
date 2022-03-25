export const getApiJson = async (url, token) => {

  let response = undefined;

  if (token) {

    response = await fetch(url, {

      method: 'GET',

      headers: {

        'Content-type': 'application/json',

        'Authorization': `Bearer ${token}`

      }

    })

  } else {

    response = await fetch(url)

  }

  const responseJson = await response.json()

  return responseJson

}

export const postApiJson = async (url, data = {}, token) => {

  let response = undefined;

  if (token) {

    response = await fetch(url, {

      method: 'POST',

      headers: {

        'Content-type': 'application/json',

        'Authorization': `Bearer ${token}`

      },

      body: JSON.stringify(data)

    })

  } else {

    response = await fetch(url, {

      method: 'POST',

      headers: {

        'Content-type': 'application/json'

      },

      body: JSON.stringify(data)

    })

  }

  const responseJson = await response.json()

  return responseJson

}

export const patchApiJson = async (url, data = {}, token) => {

  let response = undefined;

  if (token) {

    response = await fetch(url, {

      method: 'PATCH',

      headers: {

        'Content-type': 'application/json',

        'Authorization': `Bearer ${token}`

      },

      body: JSON.stringify(data)

    })

  } else {

    response = await fetch(url, {

      method: 'PATCH',

      headers: {

        'Content-type': 'application/json'

      },

      body: JSON.stringify(data)

    })

  }

  const responseJson = await response.json()

  return responseJson

}

export const putApiJson = async (url, data = {}, token) => {

  let response = undefined;

  if (token) {

    response = await fetch(url, {

      method: 'PUT',

      headers: {

        'Content-type': 'application/json',

        'Authorization': `Bearer ${token}`

      },

      body: JSON.stringify(data)

    })

  } else {

    response = await fetch(url, {

      method: 'PUT',

      headers: {

        'Content-type': 'application/json'

      },

      body: JSON.stringify(data)

    })

  }

  const responseJson = await response.json()

  return responseJson

}

export const deleteApiJson = async (url, data = {}, token) => {

  let response = undefined;

  if (token) {

    response = await fetch(url, {

      method: 'DELETE',

      headers: {

        'Content-type': 'application/json',

        'Authorization': `Bearer ${token}`

      },

      body: JSON.stringify(data)

    })

  } else {

    response = await fetch(url, {

      method: 'DELETE',

      headers: {

        'Content-type': 'application/json'

      },

      body: JSON.stringify(data)

    })

  }

  const responseJson = await response.json()

  return responseJson

}

export const postApiFormData = async (url, data = {}, token) => {

  const formData = new FormData();

  for (const name in data) {

    formData.append(name, data[name]);

  }

  let response = undefined;

  if (token) {

    response = await fetch(url, {

      method: 'POST',

      headers: {

        'Authorization': `Bearer ${token}`

      },

      body: formData

    })

  } else {

    response = await fetch(url, {

      method: 'POST',

      body: formData

    })

  }

  const responseJson = await response.json()

  return responseJson

}

export const patchApiFormData = async (url, data = {}, token) => {

  const formData = new FormData();

  for (const name in data) {

    formData.append(name, data[name]);

  }

  let response = undefined;

  if (token) {

    response = await fetch(url, {

      method: 'PATCH',

      headers: {

        'Authorization': `Bearer ${token}`

      },

      body: formData

    })

  } else {

    response = await fetch(url, {

      method: 'PATCH',

      body: formData

    })

  }

  const responseJson = await response.json()

  return responseJson

}

export const putApiFormData = async (url, data = {}, token) => {

  const formData = new FormData();

  for (const name in data) {

    formData.append(name, data[name]);

  }

  let response = undefined;

  if (token) {

    response = await fetch(url, {

      method: 'PUT',

      headers: {

        'Authorization': `Bearer ${token}`

      },

      body: formData

    })

  } else {

    response = await fetch(url, {

      method: 'PUT',

      body: formData

    })

  }

  const responseJson = await response.json()

  return responseJson

}