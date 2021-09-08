import { Breadcrumbs, Link } from "@material-ui/core"

export function Header () {
  const handleClick = () => {
    console.log('clicked')
  }

  return (
  <Breadcrumbs aria-label="breadcrumb">
    <Link color="inherit" href="/" onClick={handleClick}>
      Material-UI
    </Link>
    <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
      Core
    </Link>
    <Link
      color="textPrimary"
      href="/components/breadcrumbs/"
      onClick={handleClick}
      aria-current="page"
    >
      Breadcrumb
  </Link>
</Breadcrumbs>
  )
}

