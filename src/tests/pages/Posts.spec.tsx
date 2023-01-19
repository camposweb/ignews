import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import Posts, { getStaticProps } from '../../pages/posts'
import { getPrismicClient } from '../../services/prismic'


/* jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    }),
}))

//jest.mock('next/router')
jest.mock('next-auth/client', () => {
    return {
        useSession: () => [null, false]
    }
})

jest.mock('../../services/stripe') */

jest.mock('../../services/prismic')

const posts = [
    {
        slug: 'my-new-post',
        title: 'My new post',
        excerpt: 'Post excerpt',
        updatedAt: 'March, 10'
    }
]

describe('Posts page', () => {
    it('render corretly', () => {

        render(<Posts posts={posts} />)

    })

    it('Posts load', async () => {
        const getPrismicClientMocked = mocked(getPrismicClient)

        getPrismicClientMocked.mockReturnValueOnce({
            query: jest.fn().mockResolvedValueOnce({
                results: [
                    {
                        uid: 'my-new-post',
                        data: {
                            title: [
                                { 
                                    type: 'heading',
                                    text: 'My new post' 
                                }
                            ],
                            content: [
                                {
                                    type: 'paragraph',
                                    text: 'Post excerpt' 
                                }
                            ],
                        },
                        last_publication_date: '04-01-2021',
                    }
                ]
            })
        } as any);

        const response = await getStaticProps({})


        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    posts: [{
                        slug: 'my-new-post',
                        title: 'My new post',
                        excerpt: 'Post excerpt',
                        updatedAt: '01 de abril de 2021'
                    }]
                }
            })
        )
    })

    
})