import React, { useContext } from "react"
import Block from "."
import { Block as BlockType } from "lib/util/notion/types"

const init = ({
  deps,
  index,
  type,
}: {
  deps: number
  index: number
  type: string
}) => {
  let _deps = deps
  let _index = index
  let _type = type
  return {
    getType: () => _type,
    getIndex: () => _index,
    getDeps: () => _deps,
    checkBlockType: (type: string) => {
      if (_type === type) {
        ++_index
      } else {
        _index = 1
        _deps = 1
        _type = type
      }
    },
  }
}

export const BlocksContext = React.createContext<ReturnType<typeof init>>(
  undefined as unknown as ReturnType<typeof init>
)

const BlocksContextProvider: React.FC = ({ children }) => {
  const value = useContext(BlocksContext)

  if (value) {
    return (
      <BlocksContext.Provider
        value={init({
          deps: value.getDeps() + 1,
          type: value.getType(),
          index: 0,
        })}
      >
        {children}
      </BlocksContext.Provider>
    )
  }

  return (
    <BlocksContext.Provider
      value={init({
        deps: 1,
        index: 0,
        type: "None",
      })}
    >
      {children}
    </BlocksContext.Provider>
  )
}

export interface BlocksProps {
  parentId: string
  blocks: BlockType[]
}

const Blocks: React.FC<BlocksProps> = ({ blocks, parentId }) => {
  return (
    <BlocksContextProvider>
      {blocks.map((block, index) => (
        <Block key={`p${parentId}__c${block.id}`} block={block} index={index} />
      ))}
    </BlocksContextProvider>
  )
}

export default Blocks
