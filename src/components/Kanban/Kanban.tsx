/**
 * Nota: el strict mode de React provoca errores cuando se utiliza react-beautiful-dnd. Retirado por ahora.
 */
import { ChakraProps, Flex } from '@chakra-ui/react';
import { DragDropContext, Draggable, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';

export type Headers = {
  label: string,
  value: string
}

export type KanbanProps = {
  /**
   * Data que se pintará
   */
  data: any[];
  /**
   * Campo por el cual se agrupará los datos (ej: por estado del candidato)
   */
  groupBy: string;
  /**
   * Lista de objectos con label y valor para los headers
   */
  headers: Headers[];
  headerStyle?: ChakraProps['sx'];
  itemStyle?: ChakraProps['sx'];
  columnStyle?: ChakraProps['sx'];
  containerStyle?: ChakraProps['sx'];
  /**
   * Función que se encarga del renderizado de los items. Recibe solo UN item de data
   */
  onItemRender: (item: any) => JSX.Element;
  /**
   * Función que se encarga del renderizado de los headers. Recibe solo UN item de headers
   */
  onHeaderRender?: (item: any) => JSX.Element;
  /**
   * Función que se ejecuta cuando se suelta el objeto
   */
  onDragEnd: (result: DropResult, provided: ResponderProvided) => void
}

export function Kanban({
  data,
  groupBy,
  headers = [],
  containerStyle = {},
  headerStyle = {},
  itemStyle = {},
  columnStyle = {},
  onHeaderRender,
  onItemRender,
  onDragEnd = () => null
}: KanbanProps): JSX.Element {
  return (
    <DragDropContext onDragEnd={onDragEnd} >
      <Flex
        gap='30px'
        bgColor='gray_2'
        p='20px'
        rounded='2xl'
        w='fit-content'
        sx={containerStyle}
      >
        {
          headers.map((header) => (
            <Droppable key={`${header.value}`} droppableId={header.value} >
              {(providedDrop) => (
                <Flex
                  flexDir='column'
                  bgColor='gray_1'
                  p='20px'
                  gap='20px'
                  rounded='2xl'
                  ref={providedDrop.innerRef}
                  {...providedDrop.droppableProps}
                  sx={columnStyle}
                >
                  {/* Si tiene función de renderizado para los headers, la utiliza; si no la tiene, por defecto utiliza Flex e imprime el label */}
                  {
                    onHeaderRender
                      ? onHeaderRender(header)
                      : <Flex fontSize='xl' rounded='2xl' p='5px' justifyContent='center' sx={headerStyle} >
                        {header.label}
                      </Flex>
                  }

                  <Draggables
                    field={header.value}
                    dataToRender={data.filter(item => item[groupBy] === header.value)}
                    onRender={onItemRender}
                    sx={itemStyle}
                  />
                  {providedDrop.placeholder}
                </Flex>
              )}
            </Droppable>
          ))
        }
      </Flex>
    </DragDropContext>
  );
}

export type DraggablesProps = {
  /**
   * Campo para agrupar los items (ej: estado, nivel)
   */
  field: string,
  /**
   * Items a renderizar en la columna
   */
  dataToRender: any[],
  /**
   * Función que se encarga del renderizado de los items. Recibe solo UN item de dataToRender
   */
  onRender: (item: any) => JSX.Element,
  /**
   * Objeto con estilos de Chakra
   */
  sx?: ChakraProps['sx']
}

/**
 * Renderiza todos los arrastrables de una columna
 */
function Draggables({ field, dataToRender, onRender, sx = {} }: DraggablesProps) {
  return (
    <>
      {
        dataToRender.map((item, index) => (
          <Draggable key={`${field}-${index}`} draggableId={`${field}-${index}`} index={index}>
            {(providedDrag) => (
              <Flex
                bgColor='gray_2'
                p='10px'
                gap='20px'
                rounded='2xl'
                sx={sx}
                ref={providedDrag.innerRef}
                {...providedDrag.draggableProps}
                {...providedDrag.dragHandleProps}
              >
                {onRender(item)}
              </Flex>
            )}
          </Draggable>
        ))
      }
    </>

  );
}
