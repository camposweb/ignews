import Link from 'next/link';
import { SignInButton } from '../SignInButton';
import { ActiveLink } from '../ActiveLink';
import styles from './styles.module.scss';

export function Header(){


    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/">
                    <img src="/images/logo.svg" alt="ig.news" />
                </Link>
                <nav>
                    <ActiveLink activeClassName={styles.active} href="/">
                        <>Home</>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/posts">
                        <>Posts</>
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    );
}