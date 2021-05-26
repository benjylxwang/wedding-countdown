import React from "react";
import PropTypes from "prop-types";

import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const ImageHQ = ({ fileName, alt, ...restProps }) => (
  <StaticQuery
    query={graphql`
      query ImageHQQuery {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid(maxWidth: 3840, maxHeight: 2160, quality: 100) {
                  # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const image = data.images.edges.find((n) => n.node.relativePath.includes(fileName));

      if (!image) {
        return null;
      }

      const fluid = image.node.childImageSharp.fluid;
      return <Img alt={alt} fluid={fluid} {...restProps} />;
    }}
  />
);

ImageHQ.propTypes = {
  fileName: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

ImageHQ.defaultProps = {
  alt: null,
};

export default ImageHQ;
