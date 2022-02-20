import { request, gql } from 'graphql-request';
import { next_public_graphcms_endpoint } from '../configs/config';

export const getPosts = async () => {
	const query = gql`
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
		}
	`;

	const response = await request(next_public_graphcms_endpoint, query);

	return response?.postsConnection?.edges;
};

export const getRecentPosts = async () => {
	const query = gql`
		query getRecentPosts() {
			posts(
				orderBy: createdAt_ASC
				last: 3
			) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`;

	const response = await request(next_public_graphcms_endpoint, query);

	return response?.posts;
};

export const getSimilarPosts = async (categories, slug) => {
	const query = gql`
		query GetPostDetails($slug: String!, $categories: [String!]) {
			posts(
				where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }
				last: 3
			) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const response = await request(next_public_graphcms_endpoint, query, { categories, slug });

  return response?.posts;
};

export const getCategories = async () => {
	const query = gql`
    query GetGategories {
			categories {
				name
				slug
			}
    }
  `;

	const response = await request(next_public_graphcms_endpoint, query);

  return response?.categories;
};

export const getPostDetails = async (slug) => {
	const query = gql`
		query getPostDetails($slug: String!) {
			post(where: { slug: $slug }) {

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
				content {
					raw
				}
			}
		}
	`;

	const response = await request(next_public_graphcms_endpoint, query, { slug });

	return response?.post;
};

export const submitComment = async (obj) => {
	const response = await fetch('/api/comments', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(obj)
	});

	return response?.json();
};

export const getComments = async (slug) => {
	const query = gql`
    query GetComments ($slug: String!) {
			comments(where: { post: { slug: $slug } }) {
				name
				createdAt
				comment
			}
    }
  `;

	const response = await request(next_public_graphcms_endpoint, query, { slug });

  return response?.comments;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const response = await request(next_public_graphcms_endpoint, query);

  return response?.posts;
};

export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
      next:posts(
        first: 1
        orderBy: createdAt_ASC
        where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous:posts(
        first: 1
        orderBy: createdAt_DESC
        where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const response = await request(next_public_graphcms_endpoint, query, { slug, createdAt });

  return { next: response?.next[0], previous: response?.previous[0] };
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
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
    }
  `;

  const response = await request(next_public_graphcms_endpoint, query, { slug });

  return response?.postsConnection?.edges;
};