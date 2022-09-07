import { ReactComponent as FB } from "../assets/icons/fb.svg";
import { ReactComponent as IG } from "../assets/icons/ig.svg";
import { ReactComponent as VK } from "../assets/icons/vk.svg";

export const Network = ({ props }) => {
  const { content, cursorHover, cursorNotHover } = props;

  return (
    <article className="network">
      <a
        href={content.link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={cursorHover}
        onMouseLeave={cursorNotHover}
      >
        <div className="network-content">
          <div className="network-logo">
            {
              {
                fb: <FB />,
                ig: <IG />,
                vk: <VK />,
              }[content.icon]
            }
          </div>
          <div className="network-title">
            <h3>{content.website}</h3>
          </div>
          <div className="network-description">{content.desc}</div>
        </div>
      </a>
    </article>
  );
};
