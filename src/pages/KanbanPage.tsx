import { useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { DropResult } from 'react-beautiful-dnd';
import { Headers, Kanban } from '../components/Kanban';

export enum CandidatosEstado {
  PRESENTADO = 'presentado',
  ENTREVISTADO = 'entrevistado',
  CONTRATADO = 'contratado',
  DESCARTADO = 'descartado'
}

export enum CandidatosNivel {
  BASICO = 'basico',
  INTERMEDIO = 'intermedio',
  AVANZADO = 'avanzado'
}

const headersEstado: Headers[] = [
  {
    label: 'Presentado',
    value: CandidatosEstado.PRESENTADO
  },
  {
    label: 'Entrevistado',
    value: CandidatosEstado.ENTREVISTADO
  },
  {
    label: 'Contratado',
    value: CandidatosEstado.CONTRATADO
  },
  {
    label: 'Descartado',
    value: CandidatosEstado.DESCARTADO
  }
];

// const headersNivel = [
//   {
//     label: 'Básico',
//     value: CandidatosNivel.BASICO
//   },
//   {
//     label: 'Intermedio',
//     value: CandidatosNivel.INTERMEDIO
//   },
//   {
//     label: 'Avanzado',
//     value: CandidatosNivel.AVANZADO
//   }
// ]

const candidatos: any = [
  {
    id: 'cand-1',
    nombre: 'Luis',
    estado: CandidatosEstado.PRESENTADO,
    nivel: CandidatosNivel.BASICO
  },
  {
    id: 'cand-2',
    nombre: 'Martin',
    estado: CandidatosEstado.CONTRATADO,
    nivel: CandidatosNivel.INTERMEDIO
  },
  {
    id: 'cand-3',
    nombre: 'Claudia',
    estado: CandidatosEstado.DESCARTADO,
    nivel: CandidatosNivel.BASICO
  },
  {
    id: 'cand-4',
    nombre: 'Marta',
    estado: CandidatosEstado.ENTREVISTADO,
    nivel: CandidatosNivel.AVANZADO
  },
  {
    id: 'cand-5',
    nombre: 'Jorge',
    estado: CandidatosEstado.ENTREVISTADO,
    nivel: CandidatosNivel.BASICO
  }
];

export const KanbanPage = () => {
  const [headers, setHeaders] = useState<Headers[]>(headersEstado);

  function handleOnDragEnd(result: DropResult) {
    // Nota: tenemos dos tipos en el objecto result: columns e items.
    if (result.type === 'columns') {
      alert(`${result.draggableId} ${result.source.droppableId} ${result.source.index} -> ${result.destination?.droppableId} ${result.destination?.index}`);
      const temp = [...headers];
      if (result.destination) {
        const itemToMove = temp.splice(result.source.index, 1);
        temp.splice(result.destination?.index, 0, itemToMove[0]);
      }
      setHeaders(temp);
    } else {
      alert(`${result.draggableId} ${result.source.droppableId} ${result.source.index} -> ${result.destination?.droppableId} ${result.destination?.index}`);
      console.log(result);
    }
    console.log(result);
  }

  function handleItemRender(item: any) {
    return (
      <Flex flexDir='column'>
        <Text>
          ID: {item.id}
        </Text>
        <Text>
          Nombre: {item.nombre}
        </Text>
        <Text>
          Estado: {item.estado}
        </Text>
        <Text>
          Nivel: {item.nivel}
        </Text>
      </Flex>
    );
  }

  return (
    <Flex justifyContent='center' alignItems='center' minH='100vh' w='100%'>
      <Kanban
        data={candidatos}
        groupBy='estado'
        headers={headers}
        itemStyle={{ color: 'black' }}
        onItemRender={handleItemRender}
        onDragEnd={handleOnDragEnd}
      />
    </Flex>
  );
};
