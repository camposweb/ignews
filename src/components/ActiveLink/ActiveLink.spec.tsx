import { render, screen } from '@testing-library/react';
import { ActiveLink } from './';

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

describe('Acitvelink component', () => {
    it('renders corretly', () => {
        render (
            <ActiveLink href="/" activeClassName="active">
                <>Home</>
            </ActiveLink>
        )
    
        expect(screen.getByText('Home')).toBeInTheDocument()
    })
    
    it('adds active class if the link as corretly active', () => {
        render (
            <ActiveLink href="/" activeClassName="active" data-testid="active">
                <>Home</>
            </ActiveLink>
        )
    
        expect(screen.getByTestId('active')).toBeInTheDocument()
    })  
})

