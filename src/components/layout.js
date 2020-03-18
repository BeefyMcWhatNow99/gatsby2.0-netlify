/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { Spring, config } from "react-spring/renderprops";
import styled from "styled-components";

import "./layout.css";

import Archive from "./archive";
import Header from "./header";

const MainLayout = styled.main`
    max-width: 90%;
    margin: 1rem auto;
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 40px;
`;

const Layout = ({ children, location }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                    description
                    author
                }
            }
            file(relativePath: { regex: "/bg/" }) {
                size
                childImageSharp {
                    fluid(maxWidth: 1000) {
                        ...GatsbyImageSharpFluid_tracedSVG
                    }
                }
            }
            allFile {
                edges {
                    node {
                        name
                        mode
                        extension
                    }
                }
            }
            allMarkdownRemark {
                totalCount
                edges {
                    node {
                        html
                        excerpt
                        frontmatter {
                            title
                            date
                            slug
                        }
                    }
                }
            }
        }
    `);

    return (
        <>
            <Header siteTitle={data.site.siteMetadata.title} />

            <Spring
                from={{
                    opacity: 0,
                    height: location.pathname === "/" ? 100 : 200,
                }}
                to={{
                    opacity: 0.8,
                    height: location.pathname === "/" ? 200 : 100,
                }}
                config={config.wobbly}
            >
                {styles => (
                    <div style={{ overflow: "hidden", ...styles }}>
                        <Img fluid={data.file.childImageSharp.fluid} />
                    </div>
                )}
            </Spring>

            <div>
                <MainLayout>
                    <div>{children}</div>
                    <Archive />
                </MainLayout>

                <footer>
                    © {new Date().getFullYear()}, Built with
                    {` `}
                    <a href="https://www.gatsbyjs.org">Gatsby</a>
                </footer>
            </div>
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
    location: {},
};
export default Layout;
