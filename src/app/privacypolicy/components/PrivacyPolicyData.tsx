import Wrapper from "@/components/ui/Wrapper";
import { policySections } from "@/data/privacypolicy";
import React from "react";

const PrivacyPolicyData: React.FC = () => {
  return (
    <Wrapper>
      <h1 className="uppercase text-2xl font-bold text-center mb-6 underline">
        privacy policy
      </h1>
      <h2 className="text-2xl font-bold text-center mb-6 uppercase underline">
        Privacy and Personal Data Processing Policy
      </h2>
      <p className=" text-lg font-medium mb-6">
        This document, "Privacy and Personal Data Processing Policy"
        (hereinafter referred to as the "Policy"), represents the rules for the
        use of personal information of users by BURUNE TECHNOLOGIES LTD or any
        of its affiliates, products or subsidiaries (hereinafter referred to as
        the "Company").
      </p>

      {policySections.map((section, sectionIndex) => (
        <section key={sectionIndex} className="mb-8">
          {/* Section Title */}
          <h2 className="text-xl  underline pl-6 font-semibold mb-4">
            {" "}
            {`${sectionIndex + 1}. ${section.title}`}
          </h2>

          {section.content.map((content, contentIndex) => (
            <div key={contentIndex} className="mb-6">
              {/* Dynamic Subtitle Numbering */}
              {Array.isArray(content.subtitle) ? (
                content.subtitle.map((text, textIndex) => (
                  <p key={textIndex} className="mb-4">
                    {`${sectionIndex + 1}.${contentIndex + 1} ${text}`}
                  </p>
                ))
              ) : (
                <p className=" mb-4">
                  {`${sectionIndex + 1}.${contentIndex + 1}`} {content.subtitle}
                </p>
              )}

              {/* Items List */}
              {content.items && (
                <ul className="list-disc list-inside pl-5 mb-4">
                  {content.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="mb-1">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      ))}
    </Wrapper>
  );
};

export default PrivacyPolicyData;
