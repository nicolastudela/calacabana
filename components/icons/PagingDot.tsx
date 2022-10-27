{/* <svg
    className="paging-dot"
    width="6"
    height="6"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <circle cx="3" cy="3" r="3"></circle>
  </svg> */}

import { createIcon } from '@chakra-ui/icons'

// using `path`
export const PagingDot = createIcon({
  displayName: 'UpDownIcon',
  viewBox: '0 0 200 200',

  // path can also be an array of elements, if you have multiple paths, lines, shapes, etc.
  path: (
    <path
      fill='currentColor'
      d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
    />
  ),
})