import { request, gql } from 'graphql-request';
import { next_public_graphcms_endpoint } from '../configs/config';

export const getPosts = async () => {
	const query = await gql`
		query MyQuery {
			postsConnection {
				edges {
					node {
						author {
							bio
							id
							name
							photo {
                url
              }
						}
						slug
						title
						createdAt
						excerpt
						featuredImage {
							url
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}`

	const results = await request(next_public_graphcms_endpoint, query);

	return results || [];
}