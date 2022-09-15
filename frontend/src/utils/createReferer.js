  const scroller = (ref, navbarHeight) => {
    return () => {
      const scroll_pos = navbarHeight ? ref.current.offsetTop - navbarHeight : ref.current.offsetTop
      window.scrollTo({top: scroll_pos, left:0, behavior:"smooth"})
    }
  }

  const createReferer = (label, refObj, navbar) => {
    const navbarHeight = navbar ? navbar.scrollHeight : 0
    return [label, scroller(refObj, navbarHeight)]
  }

export default createReferer