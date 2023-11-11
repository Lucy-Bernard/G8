import Link from 'next/link';

import styles from "./NavigationBar.module.css";

export type PageLink = {
  link_text: string,
  link_url: string
}

export type NavigationBarProps = {
  links: Array<PageLink>
}

export default function NavigationBar(props: NavigationBarProps) {
  return (
    <nav className={styles.navigation_bar}>
      <Link href="/">
        <h1>Logo</h1>
      </Link>

      <ul>
        {props.links.map((link) => {
          return (
            <li key={link.link_url}>
              <Link href={`/${link.link_url}`}>
                {link.link_text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}