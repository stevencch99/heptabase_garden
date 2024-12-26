import CustomCard from "@/components/CustomCard";
import CustomColor from "@/components/CustomColor";
import Li from "@/components/CustomLi";
import { MathBlock, MathInline } from "@/components/CustomMath";
import { ToggleListItem } from "@/components/CustomToggleList";
import {
  transformBulletList,
  transformListItems,
} from "@/utils/heptabaseFunction";
import Blockquote from "@tiptap/extension-blockquote";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import { Document } from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { generateHTML } from "@tiptap/html";
import CardContent from "./CardContent";

export default function CardComponent({
  content,
  cards,
}: {
  content: string;
  cards: Card[];
}) {
  const parsedContent = JSON.parse(content);
  const transformedContent = transformListItems(parsedContent.content).map(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (item: any) => transformBulletList(item)
  );

  const genCardId = () => {
    return transformedContent.length > 0 ? transformedContent[0].attrs.id : "";
  };

  console.log(transformedContent);

  const htmlContent = content
    ? generateHTML(
        {
          type: "doc",
          content: transformedContent,
        },
        [
          Document,
          Paragraph,
          Text,
          TextStyle,
          Heading,
          Strike,
          CustomColor,
          MathInline,
          MathBlock,
          ToggleListItem,
          Code,
          Blockquote,
          Image,
          CodeBlock.extend({
            name: "code_block",
          }),
          Bold.extend({
            name: "strong",
          }),
          Underline.extend({
            name: "underline",
          }),
          Link.extend({
            name: "link",
          }),
          CustomCard.configure({ cards }),
          Li,
          OrderedList.extend({
            name: "numbered_list_item",
          }),
          ListItem,
          BulletList.extend({
            name: "bullet_list_item",
          }),
        ]
      )
    : "";

  return (
    <div
      className="prose h-screen w-full overflow-y-auto px-4 py-8 md:min-w-[550px] md:max-w-[580px]"
      data-card-id={genCardId()}
    >
      <CardContent cards={cards} htmlContent={htmlContent} />
    </div>
  );
}