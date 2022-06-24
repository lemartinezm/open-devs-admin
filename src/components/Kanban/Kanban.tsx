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

/**
  * Kanban personalizable.
  */
export function Kanban({
  data,
  groupBy,
  headers,
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
         <Droppable droppableId="board" direction="horizontal" isDropDisabled={false} type='columns'>
           {(providedBoard) => (
             <Flex
               ref={providedBoard.innerRef}
               {...providedBoard.droppableProps}
               gap='20px'
             >
               <Draggables
                 dataToRender={headers}
                 sx={{ bgColor: 'none' }}
               >
                 {(header) => (
                   <Droppable key={`${header.value}`} droppableId={header.value} type='items'>
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
                         dataToRender={data.filter(item => item[groupBy] === header.value)}
                         onRender={onItemRender}
                         sx={itemStyle}
                       />
                       {providedDrop.placeholder}
                     </Flex>
                   )}
                 </Droppable>
                 )}
               </Draggables>
               {providedBoard.placeholder}
             </Flex>
           )}
         </Droppable>
       </Flex>
     </DragDropContext>
  );
}

export type DraggablesProps = {
   /**
    * Items a renderizar en la columna o fila. Se espera que los datos pasados tengan un campo id o value que será usado para la identificación del item.
    */
   dataToRender: any[],
   /**
    * Función que se encarga del renderizado de los items. Recibe solo UN item de dataToRender
    */
   onRender?: (item: any) => JSX.Element,
   /**
    * Objeto con estilos de Chakra
    */
   sx?: ChakraProps['sx'],
   /**
    * Recibe UN item de dataToRender con el que se puede realizar otras acciones o renderizado
    */
   children?: (item: any) => JSX.Element
 }

/**
  * Renderiza múltiples arrastrables utilizando map
  */
function Draggables({ dataToRender, onRender, sx = {}, children }: DraggablesProps) {
  return (
     <>
       {
         dataToRender.map((item, index) => (
           // ! Nota: se espera que el item pasado tenga un campo id o value para ser utilizado como draggableId
           <Draggable key={`${item.id || item.value}`} draggableId={`${item.id || item.value}`} index={index}>
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
                 {onRender ? onRender(item) : null}
                 {children ? children(item) : null}
               </Flex>
             )}
           </Draggable>
         ))
       }
     </>
  );
}
