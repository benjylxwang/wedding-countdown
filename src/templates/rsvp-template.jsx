import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import NavbarAlt from "views/NavbarAlt";
import * as Sections from "views/Sections";
import SEO from "components/SEO";
import LanguageSelector from "components/LanguageSelector";

import "utils/fixFontAwesome";
import breakDownAllNodes from "utils/breakDownAllNodes";
import fileNameToSectionName from "utils/fileNameToSectionName";

import "../style/rsvp.scss";  

/**
 * get file name list from content/sections folder
 */ 

export const query = graphql`
  query RSVPQuery($langKey: String!) {
    site {
      siteMetadata {
        keywords
        description
      }
    }
    allMarkdownRemark(
      filter: { fields: { langKey: { eq: $langKey } } }
      sort: { order: ASC, fields: [fields___directoryName, fields___fileName] }
    ) {
      nodes {
        frontmatter {
          brand
          anchor
          clients {
            href
            imageFileName
          }
          content
          contactSuggestText
          copyright
          details
          links {
            title
            url
          }
          thingsToDo {
            title
            url
            address
            description
          }
          header
          email
          imageFileName
          jumpToAnchor
          jumpToAnchorText
          daysText
          hoursText
          minutesText
          secondsText
          msText
          menuText
          portfolios {
            content
            header
            subheader
            imageFileName
          }
          rsvpNameLabel
          rsvpEmailLabel
          rsvpInviteCodeLabel
          rsvpConfirmButtonLabel
          rsvpAddPeopleButtonLabel
          rsvpAddAdditionalPeopleLabel
          rsvpOtherPeopleNameLabel
          removePersonButtonLabel
          rsvpDoneSubheader
          rsvpAgainButtonLabel
          savingDetailsAlert
          inviteCodeErrorAlert
          serverIssueAlert
          services {
            content
            header
            iconName
            imageFileName
          }
          subheader
          telephone
          title
          timeline {
            header
            imageFileName
            subheader
          }
        }
        fields {
          fileName
          directoryName
        }
      }
    }
  }
`;

const RSVPPage = ({ data, pathContext: { langKey, defaultLang, langTextMap } }) => {
  const {
    site: {
      siteMetadata: { keywords, description },
    },
    allMarkdownRemark: { nodes },
  } = data;
  console.log(Sections);

  const { navBarNode } = breakDownAllNodes(nodes);

  let langSelectorPart;
  if (langTextMap != null && Object.keys(langTextMap).length > 1) {
    langSelectorPart = (
      <LanguageSelector langKey={langKey} defaultLang={defaultLang} langTextMap={langTextMap} />
    );
  }

  return (
    <>
      <SEO lang={langKey} title="Time to Get Married" keywords={keywords} description={description} />
      <NavbarAlt
        frontmatter={navBarNode.frontmatter}
        extraItems={langSelectorPart}
      />
    </>
  );
};

RSVPPage.propTypes = {
  data: PropTypes.object.isRequired,
  pathContext: PropTypes.object,
};

RSVPPage.defaultProps = {
  pathContext: {
    langKey: "en",
    defaultLang: "en",
    langTextMap: {},
  },
};

export default RSVPPage;
