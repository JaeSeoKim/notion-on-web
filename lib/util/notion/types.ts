import {
  $ElementType,
  Assign,
  PromiseType,
  SetIntersection,
  ValuesType,
} from "utility-types"
import { Client } from "@notionhq/client"
import getDatabase from "./getDatabase"
import { OpenGraphType } from "../getOpenGraph"

export declare type GetBlockResponse = PromiseType<
  ReturnType<typeof Client.prototype.blocks.retrieve>
>

type _block_types = $ElementType<GetBlockResponse, "type">
/**
 * @version "@notionhq/client : 0.4.4"
 *
 * audio
 * bookmark
 * bulleted_list_item
 * callout
 * child_database
 * child_page
 * code
 * embed
 * equation
 * file
 * pdf
 * video
 * heading_1
 * heading_2
 * heading_3
 * image
 * numbered_list_item
 * paragraph
 * to_do
 * toggle
 *
 * @etc 2021-10-19 기준 Change Log에 반영됨
 * @see https://developers.notion.com/changelog/table-of-contents-and-divider-block-types-are-now-supported
 * @see https://developers.notion.com/changelog/breadcrumb-block-types-are-now-supported-in-the-api
 * table_of_contents
 * divider
 * breadcrumb
 */

export declare type GetPageResponse = PromiseType<
  ReturnType<typeof Client.prototype.pages.retrieve>
>

export declare type GetDatabaseResponse = PromiseType<
  ReturnType<typeof Client.prototype.databases.retrieve>
>

export declare type QueryDatabaseResponse = PromiseType<
  ReturnType<typeof Client.prototype.databases.query>
>

export declare type DatabasesQueryType = $ElementType<
  QueryDatabaseResponse,
  "results"
>

export declare type RichTextType = ValuesType<
  ValuesType<
    $ElementType<
      SetIntersection<GetBlockResponse, { type: "paragraph" }>,
      "paragraph"
    >
  >
>

export declare type AnnotationsType = $ElementType<RichTextType, "annotations">

export declare type Block =
  | AudioBlock
  | BookmarkBlock
  | BulletedListItemBlock
  | CalloutBlock
  | ChildDatabaseBlock
  | ChildPageBlock
  | CodeBlock
  | EmbedBlock
  | EquationBlock
  | FileBlock
  | PdfBlock
  | VideoBlock
  | Heading1Block
  | Heading2Block
  | Heading3Block
  | ImageBlock
  | NumberedListItemBlock
  | ParagraphBlock
  | ToDoBlock
  | ToggleBlock
  | TableOfContentsBlock
  | DividerBlock
  | BreadcrumbBlock
  | UnsupportedBlock

type _OptionalChildrenBlocks = {
  children?: Block[]
}

export declare type AudioType = SetIntersection<
  GetBlockResponse,
  {
    type: "audio"
  }
>

export declare type AudioBlock = Assign<AudioType, _OptionalChildrenBlocks>

export declare type BookmarkType = SetIntersection<
  GetBlockResponse,
  {
    type: "bookmark"
  }
>

export declare type BookmarkBlock = Assign<
  BookmarkType,
  {
    bookmark: Assign<
      $ElementType<BookmarkType, "bookmark">,
      {
        opengraph: OpenGraphType
      }
    >
  }
>

export declare type BulletedListItemType = SetIntersection<
  GetBlockResponse,
  {
    type: "bulleted_list_item"
  }
>

export declare type BulletedListItemBlock = Assign<
  BulletedListItemType,
  _OptionalChildrenBlocks
>

export declare type CalloutType = SetIntersection<
  GetBlockResponse,
  {
    type: "callout"
  }
>

export declare type CalloutBlock = Assign<CalloutType, _OptionalChildrenBlocks>

export declare type ChildDatabaseType = SetIntersection<
  GetBlockResponse,
  {
    type: "child_database"
  }
>

export declare type ChildDatabaseBlock = Assign<
  ChildDatabaseType,
  {
    data: ReturnType<typeof getDatabase>
  }
>

export declare type ChildPageType = SetIntersection<
  GetBlockResponse,
  {
    type: "child_page"
  }
>

export declare type ChildPageBlock = Assign<
  ChildPageType,
  {
    child_page: Assign<
      $ElementType<ChildPageType, "child_page">,
      {
        retrieve: GetPageResponse
      }
    >
  }
>

export declare type CodeType = SetIntersection<
  GetBlockResponse,
  {
    type: "code"
  }
>

export declare type CodeBlock = Assign<CodeType, _OptionalChildrenBlocks>

export declare type EmbedType = SetIntersection<
  GetBlockResponse,
  {
    type: "embed"
  }
>

export declare type EmbedBlock = Assign<EmbedType, _OptionalChildrenBlocks>

export declare type EquationType = SetIntersection<
  GetBlockResponse,
  {
    type: "equation"
  }
>

export declare type EquationBlock = Assign<
  EquationType,
  _OptionalChildrenBlocks
>

export declare type FileType = SetIntersection<
  GetBlockResponse,
  {
    type: "file"
  }
>

export declare type FileBlock = Assign<FileType, _OptionalChildrenBlocks>

export declare type PdfType = SetIntersection<
  GetBlockResponse,
  {
    type: "pdf"
  }
>

export declare type PdfBlock = Assign<PdfType, _OptionalChildrenBlocks>

export declare type VideoType = SetIntersection<
  GetBlockResponse,
  {
    type: "video"
  }
>

export declare type VideoBlock = Assign<VideoType, _OptionalChildrenBlocks>

export declare type Heading1Type = SetIntersection<
  GetBlockResponse,
  {
    type: "heading_1"
  }
>

export declare type Heading1Block = Assign<
  Heading1Type,
  _OptionalChildrenBlocks
>

export declare type Heading2Type = SetIntersection<
  GetBlockResponse,
  {
    type: "heading_2"
  }
>

export declare type Heading2Block = Assign<
  Heading2Type,
  _OptionalChildrenBlocks
>

export declare type Heading3Type = SetIntersection<
  GetBlockResponse,
  {
    type: "heading_3"
  }
>

export declare type Heading3Block = Assign<
  Heading3Type,
  _OptionalChildrenBlocks
>

export declare type ImageType = SetIntersection<
  GetBlockResponse,
  {
    type: "image"
  }
>

export declare type ImageBlock = Assign<ImageType, _OptionalChildrenBlocks>

export declare type NumberedListItemType = SetIntersection<
  GetBlockResponse,
  {
    type: "numbered_list_item"
  }
>

export declare type NumberedListItemBlock = Assign<
  NumberedListItemType,
  _OptionalChildrenBlocks
>

export declare type ParagraphType = SetIntersection<
  GetBlockResponse,
  {
    type: "paragraph"
  }
>

export declare type ParagraphBlock = Assign<
  ParagraphType,
  _OptionalChildrenBlocks
>

export declare type ToDoType = SetIntersection<
  GetBlockResponse,
  {
    type: "to_do"
  }
>

export declare type ToDoBlock = Assign<ToDoType, _OptionalChildrenBlocks>

export declare type ToggleType = SetIntersection<
  GetBlockResponse,
  {
    type: "toggle"
  }
>

export declare type ToggleBlock = Assign<ToggleType, _OptionalChildrenBlocks>

export declare type UnsupportedType = SetIntersection<
  GetBlockResponse,
  {
    type: "unsupported"
  }
>

export declare type UnsupportedBlock = Assign<
  ToggleType,
  _OptionalChildrenBlocks
>

/*
 TODO: 해당 타입이 아직 미지원 간단한 프로토 타이핑으로 대체

 export declare type TableOfContentsType = SetIntersection<
 GetBlockResponse,
 { type: "table_of_contents" }
 >
 export declare type TableOfContentsBlock = TableOfContentsType

 export declare type DividerType = SetIntersection<
 GetBlockResponse,
 { type: "divider" }
 >
 export declare type DividerBlock = DividerType

 export declare type BreadcrumbType = SetIntersection<
 GetBlockResponse,
 { type: "breadcrumb" }
 >
 export declare type BreadcrumbBlock = BreadcrumbType
 */

export declare type TableOfContentsType = Assign<
  UnsupportedType,
  { type: "table_of_contents"; table_of_contents: Object }
>
export declare type TableOfContentsBlock = Assign<
  TableOfContentsType,
  _OptionalChildrenBlocks
>

export declare type DividerType = Assign<
  UnsupportedType,
  { type: "divider"; divider: Object }
>
export declare type DividerBlock = Assign<DividerType, _OptionalChildrenBlocks>

export declare type BreadcrumbType = SetIntersection<
  UnsupportedType,
  { type: "breadcrumb"; breadcrumb: Object }
>
export declare type BreadcrumbBlock = Assign<
  BreadcrumbType,
  _OptionalChildrenBlocks
>
