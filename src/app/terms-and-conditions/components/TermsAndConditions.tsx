import Wrapper from "@/components/ui/Wrapper";
import termsContent from "@/data/terms-and-conditions";
import React from "react";

const TermsAndConditions = () => {
  return (
    <Wrapper>
      <h1 className="uppercase text-2xl font-bold text-center mb-6 underline">
        terms and conditions
      </h1>
      <p className="text-lg font-medium mb-2">
        Our Terms and Conditions were last updated on the 30th of October, 2024
      </p>
      <p className="text-lg font-medium mb-6">
        Welcome to BURUNE TECHNOLOGIES LTD!
      </p>

      <div className="">
        {termsContent.map((section, index) => (
          <section key={index} className="mb-10">
            <h2 className="text-xl underline pl-6 font-semibold mb-4">
              {` ${index + 1}. 
              ${section.title}`}
            </h2>

            {section.content?.map((paragraph, idx) => (
              <p key={idx} className="mb-2 text-lg text-gray-800">
                {paragraph}
              </p>
            ))}

            {section.items && (
              <ul className="list-disc ml-6 space-y-1">
                {section.items.map((item, idx) => (
                  <li key={idx} className="text-normal text-base">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {section.subtitles?.map((subtitle, subIdx) => (
              <div key={subIdx} className="mt-4">
                <h3 className="text-lg font-semibold underline mb-1">{subtitle.name}</h3>
                {subtitle.content.map((subParagraph, idx) => (
                  <p key={idx} className="mb-2 text-lg text-gray-800">
                    {subParagraph}
                  </p>
                ))}
                {subtitle.items && (
                  <ul className="list-disc ml-6 space-y-1">
                    {subtitle.items.map((subItem, idx) => (
                      <li key={idx} className="text-gray-text-normal text-basetext-normal text-base800">
                        {subItem}
                      </li>
                    ))}
                  </ul>
                )}
                {subtitle.footer &&
                  subtitle.footer.map((footerItem, idx) => (
                    <p key={idx} className=" mt-2">
                      {footerItem}
                    </p>
                  ))}
              </div>
            ))}

            {section.footer && (
              <p className="mb-2 text-lg text-gray-800">{section.footer.join(" ")}</p>
            )}
          </section>
        ))}
      </div>
    </Wrapper>
  );
};

export default TermsAndConditions;
