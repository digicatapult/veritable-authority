/**
 * This function is used to create the logo for the application
 * @returns A link with the logo component inside.
 */
import Logo from '../../../AgentAuthority/Logo'

export default function LogoWrap({ children }) {
  return (
    <a
      className="navbar-brand d-none d-md-block"
      href="./"
      onClick={(e) => e.preventDefault()}
    >
      <Logo />
      {children && children}
    </a>
  )
}
