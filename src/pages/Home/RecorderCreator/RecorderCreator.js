import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useReducer,
  useRef,
} from 'react';
import ContactSelector from '../../../Componets/ContactSelector';
import AssistantWrapper from './AssistantWrapper';
import RecorderAssistant from './RecorderAssistant';
export const PermissionsContext = createContext();
export const ComponentsQueue = createContext();
function queueReducer(state, value) {
  return {
    ...state,
    ...value,
  };
}
export const CreateRecordContext = createContext();
const RecorderCreator = () => {
  const [selectedContacts, setSelectedContact] = useState([]);
  const [mediaType, setMediaType] = useState('AUDIO');
  const [mediaFile, setMediaFile] = useState(null);
  const WrappedContactSelector = () => (
    <AssistantWrapper
      context={ComponentsQueue}
      mainComponent={<ContactSelector/>}
    />
  );
  const WrappedoctRecorderAssistant = () => (
    <AssistantWrapper
      context={ComponentsQueue}
      mainComponent={<RecorderAssistant />}
    />
  );

  const defaultQueue = [
    <WrappedContactSelector/>,
    <WrappedoctRecorderAssistant />,
  ];
  const queue = useRef(defaultQueue);
  const [queueDetails, queueDetailsDispatch] = useReducer(queueReducer, {
    cursor: 0,
    currentComponent: defaultQueue[0],
    queue: defaultQueue,
  });

  const hasProvous = (() => queueDetails.cursor > 0)();
  const previous = useCallback(() => {
    if (hasProvous) {
      const index = queueDetails.cursor - 1;

      queueDetailsDispatch({
        cursor: index,
        currentComponent: queue.current[index],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queueDetails]);
  const hasNext = (() => queueDetails.cursor + 1 < queue.current.length)();
  const next = (bypass = false) => {
    if (!bypass) if (!hasNext) return;
    const index = queueDetails.cursor + 1;

    queueDetailsDispatch({
      cursor: index,
      currentComponent: queue.current[index],
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  useEffect(() => {
  }, []);

  return (
    <CreateRecordContext.Provider
      value={{
        selectedContacts,
        setSelectedContact,
        setMediaType,
        mediaType,
        setMediaFile,
        mediaFile,
      }}
    >
      <ComponentsQueue.Provider
        value={{
          queueDetailsDispatch,
          hasProvous,
          hasNext,
          next,
          previous,
          queue: queue.current,
          cursor: queueDetails.cursor,
          defaultQueue,
        }}
      >
        {queueDetails.currentComponent}
      </ComponentsQueue.Provider>
    </CreateRecordContext.Provider>
  );
};

export default RecorderCreator;
