import { render, screen, fireEvent } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { signIn, useSession } from 'next-auth/client';
import { SubscribeButton } from './';
import { useRouter } from 'next/router';


/* jest.mock('next-auth/client', () => {
    return {
        useSession() {
            return [null, false]
        },
        signIn: jest.fn(),
    }
}) */

jest.mock('next-auth/client')

jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    }),
}))


describe('SignInButton component', () => {
    it('renders corretly', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null, false])

        render(<SubscribeButton priceId="89" />)

        expect(screen.getByText('Subscribe Now')).toBeInTheDocument()
    })

    it('redirects user to sign in when not authenticated', () => {
        const signInMocked = mocked(signIn)
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null, false])
        
        render(<SubscribeButton priceId='89' />)

        const subscribeButton = screen.getByText('Subscribe Now');

        fireEvent.click(subscribeButton)
        
        expect(signInMocked).toHaveBeenCalled()
    })

    it('redirects tp posts when user already has a subscription', () => {
        const useRouterMocked = mocked(useRouter)
        const useSessionMocked = mocked(useSession)

        const pushMock = jest.fn()

        useSessionMocked.mockReturnValueOnce([
            { 
                user: { 
                    name: 'John Doe', 
                    email: 'john.doe@example.com'},
                    activeSubscription: 'fake-active-subscription',
                    expires: 'fake-expires'},
                false
        ])

        useRouterMocked.mockReturnValueOnce({
            push: pushMock,
        } as any)

        render(<SubscribeButton priceId='89' />)

        const subscribeButton = screen.getByText('Subscribe Now')

        fireEvent.click(subscribeButton)

        expect(pushMock).toHaveBeenCalledWith('/posts')
    })
})