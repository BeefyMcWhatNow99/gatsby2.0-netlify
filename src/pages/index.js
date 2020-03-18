import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import Listing from "../components/listing";
// import Image from "../components/image";
import SEO from "../components/seo";
// import Img from "gatsby-image";

const IndexPage = ({ location }) => (
    <Layout
        // @ts-ignore
        henk="layout indexpageprop"
        location={location}
    >
        <SEO title="Home" />

        <Listing />
    </Layout>
);

export default IndexPage;

export const pageQuery = graphql`
    query {
        imageOne: file(relativePath: { eq: "gatsby-icon.png" }) {
            childImageSharp {
                fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`;
