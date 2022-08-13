// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { get, post, responseIsOk } from '../fetch'

// describe('fetch', () => {
//   const url = 'some/url'
//   const getPayload = { someParam: '1' }
//   const getSerializedPayload = new URLSearchParams(getPayload).toString()
//   const postPayload = {
//     method: 'POST',
//     headers: '',
//     body: JSON.stringify(getPayload),
//   }
//   const successResponse = { status: 200, error: null, data: 'some data' }
//   const errorResponse = {
//     error: 'There was a problem with the server',
//     isError: true,
//   }

//   beforeEach(() => {
//     global.fetch = jest.fn((): any =>
//       Promise.resolve({
//         status: 200,
//         json: () => Promise.resolve(successResponse),
//       })
//     )
//   })

//   afterEach(() => {
//     jest.resetAllMocks()
//   })
//   describe('Get', () => {
//     test('should call the native fetch method and return some data if successful', async () => {
//       const result: any = await get(url, getPayload, { Authorization: 'foo' })

//       expect(fetch).toHaveBeenCalledWith(`${url}?${getSerializedPayload}`, {
//         headers: { Authorization: 'foo' },
//       })
//       expect(result).toEqual('some data')
//     })

//     test('should return a server error when exception', async () => {
//       const mockedFetch = global.fetch as jest.Mock
//       mockedFetch.mockImplementationOnce(() =>
//         Promise.reject(new Error('Server is down'))
//       )
//       const result: any = await get(url, getPayload)

//       expect(result).toEqual(errorResponse)
//     })

//     test('should return an error when status code is > 300', async () => {
//       const mockedFetch = global.fetch as jest.Mock
//       mockedFetch.mockImplementationOnce(() =>
//         Promise.resolve({
//           json: () => Promise.resolve({ ...errorResponse, status: 403 }),
//         })
//       )
//       const result: any = await get(url, getPayload)
//       expect(result).toEqual(errorResponse)
//     })
//   })

//   describe('Post', () => {
//     test('should call the native fetch method and return some data if successful', async () => {
//       const result: any = await post(url, postPayload)

//       expect(fetch).toHaveBeenCalled()
//       expect(result).toEqual('some data')
//     })

//     test('should return a server error when exception', async () => {
//       const mockedFetch = global.fetch as jest.Mock
//       mockedFetch.mockImplementationOnce(() =>
//         Promise.reject(new Error('Server is down'))
//       )
//       const result: any = await post(url, postPayload)

//       expect(result).toEqual(errorResponse)
//     })

//     test('should return an error when status code is > 300', async () => {
//       const mockedFetch = global.fetch as jest.Mock
//       mockedFetch.mockImplementationOnce(() =>
//         Promise.resolve({
//           json: () => Promise.resolve({ ...errorResponse, status: 403 }),
//         })
//       )
//       const result: any = await post(url, postPayload)
//       expect(result).toEqual(errorResponse)
//     })
//   })

//   describe('responseIsOk', () => {
//     test('should return TRUE when provided with a successful response', async () => {
//       const isOk = responseIsOk({
//         ...successResponse,
//         ok: true,
//         redirected: false,
//         statusText: '',
//         type: 'basic',
//         url: '',
//       })

//       expect(isOk).toBeTruthy()
//     })
//   })
// })
