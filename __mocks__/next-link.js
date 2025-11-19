import React from 'react'

const Link = React.forwardRef(({ href, children, ...rest }, ref) => {
  return (
    <a href={href} ref={ref} {...rest}>
      {children}
    </a>
  )
})

Link.displayName = 'Link'

export default Link
