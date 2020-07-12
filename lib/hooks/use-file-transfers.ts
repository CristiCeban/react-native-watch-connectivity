import {useEffect, useState} from 'react';
import {FileTransfer, getFileTransfers} from '../files';
import watchEvents from '../events';

// TODO: This needs some love. Perhaps maintain a cache and process the local events rather than refetching all transfers
export function useFileTransfers() {
  const [fileTransfers, setFileTransfers] = useState<FileTransfer[]>([]);
  useEffect(() => {
    getFileTransfers().then((transfers) => {
      setFileTransfers(Object.values(transfers));
    });

    return watchEvents.addListener('file', () => {
      getFileTransfers().then((transfers) => {
        setFileTransfers(Object.values(transfers));
      });
    });
  }, []);

  return fileTransfers;
}