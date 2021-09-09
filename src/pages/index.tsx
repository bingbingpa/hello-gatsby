import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import GlobalStyle from 'components/common/globalStyle';
import Introduction from 'components/main/introduction';
import Footer from 'components/common/footer';
import CategoryList from 'components/main/categoryList';
import PostList, { PostType } from 'components/main/postList';
import { graphql } from 'gatsby';
import { ProfileImageProps } from 'components/main/profileImage';

interface IndexPageProps {
  data: {
    allMarkdownRemark: {
      edges: PostType[];
    };
    file: {
      childImageSharp: {
        fluid: ProfileImageProps['profileImage'];
      };
    };
  };
}

const CATEGORY_LIST = {
  All: 5,
  Web: 3,
  Mobile: 2,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const IndexPage: FunctionComponent<IndexPageProps> = function ({
                                                                 data: {
                                                                   allMarkdownRemark: { edges },
                                                                   file: {
                                                                     childImageSharp: { fluid },
                                                                   },
                                                                 },
                                                               }) {
  return (
    <Container>
      <GlobalStyle />
      <Introduction profileImage={fluid} />
      <CategoryList selectedCategory="Web" categoryList={CATEGORY_LIST} />
      <PostList posts={edges} />
      <Footer />
    </Container>
  );
};

export default IndexPage;

export const queryPostList = graphql`
  query queryPostList {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail {
              childImageSharp {
                fluid(
                  maxWidth: 768
                  maxHeight: 200
                  fit: INSIDE
                  quality: 100
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
    file(name: { eq: "profile-image" }) {
      childImageSharp {
        fluid(maxWidth: 120, maxHeight: 120, fit: INSIDE, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`;