export interface Error {
  error?: string | unknown
  isError: true
}

export interface GenericRes {
  isError: false
}

export type BaseResponse = Pick<
  Response,
  'headers' | 'ok' | 'redirected' | 'status' | 'statusText' | 'type' | 'url'
>

/**
 * Extract properties from response
 * @param {*} response fetch response object
 * @returns object with response properties
 */
export const parseResponseProperties = (response: Response): BaseResponse => ({
  headers: response.headers,
  ok: response.ok,
  redirected: response.redirected,
  status: response.status,
  statusText: response.statusText,
  type: response.type,
  url: response.url,
})

export const get = async <Payload, Res>(
  url: string,
  payload?: Payload,
  reqHeaders?: HeadersInit
): Promise<Res | Error> => {
  try {
    const headers = {
      ...reqHeaders,
    }
    const params = payload
      ? `?${new URLSearchParams(payload as never).toString()}`
      : ''

    const doFetch = async () => {
      const response = await fetch(url + params, {
        headers,
      })
      return {
        ...parseResponseProperties(response),
        data: await response.json(),
      }
    }
    const res = await doFetch()

    const err = res?.data?.error

    if (res.status >= 200 && res.status < 300 && !err) {
      return res?.data?.data || res?.data || res
    }

    return {
      error: err || 'There was a problem with the server',
      isError: true,
    }
  } catch (err) {
    return { error: 'There was a problem with the server', isError: true }
  }
}

export const post = async <Payload, Res>(
  url: string,
  payload: Payload,
  reqHeaders?: HeadersInit
): Promise<Res | Error> => {
  try {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      ...reqHeaders,
    }

    const res = await (
      await fetch(url, {
        method: 'POST',
        headers,
        body: typeof payload === 'string' ? payload : JSON.stringify(payload),
      })
    ).json()

    const err = res?.data?.error || res?.error

    // TODO: remove 'res.queued' from the condition once the endpoint be fixed
    if ((res.status >= 200 && res.status < 300 && !err) || res.queued) {
      return res?.data?.data || res?.data || res
    }

    return {
      error: err || 'There was a problem with the server',
      isError: true,
    }
  } catch (err) {
    return { error: 'There was a problem with the server', isError: true }
  }
}

export interface FetchResponse
  extends Pick<
    Response,
    'ok' | 'redirected' | 'status' | 'statusText' | 'type' | 'url'
  > {
  json?: { status: boolean; data: Array<any> }
  text?: string
  headers?: Response['headers']
}

export const responseIsOk = (response: FetchResponse): boolean =>
  response.status >= 200 && response.status < 300 && response.ok
