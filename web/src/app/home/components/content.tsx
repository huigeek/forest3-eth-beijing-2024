"use client";

import { Box, Text, VStack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { collectionTableName, getDatabase, isIndexedDBSupported } from "~/util/indexDB";
import type { Category, Site } from "~/services";
import { H2 } from "~/app/home/components/primitives";

export const UserCollectionContext = React.createContext<{
  setUserCollection: React.Dispatch<React.SetStateAction<Site[]>>;
}>({
  setUserCollection: () => { },
});

function Content() {
  const [userCollection, setUserCollection] = useState<Site[]>([]);
  const toast = useToast();

  const updateMyCollection = () => {
    if (isIndexedDBSupported()) {
      getDatabase().then((db) => {
        db.readAll(collectionTableName).then(((res) => {
          if (res) {
            setUserCollection(res as Site[]);
          }
        }));
      });
    }
  };

  useEffect(() => {
    updateMyCollection();
  }, []);

  const userCategory: Category = {
    name: "主页",
    sites: userCollection,
    icon: "",
  };

  return (
    <Box className="page-wrapper rounded-2xl w-full h-full min-h-full overflow-y-scroll overflow-x-hidden">
      <UserCollectionContext.Provider value={{ setUserCollection }}>
        <VStack
          className="p-4"
          alignItems="stretch"
          rowGap="30px"
          display="inline-flex"
          pos="relative"
        >
          <div>
            <Box flexGrow={1} alignSelf="stretch" pt="50px">
              <VStack alignItems="flex-start" fontSize="16px" pb={5}>
                <H2 fontSize="16px" mb="15px">关于早睡基金</H2>
                <Text>
                  介绍介绍介绍。。。。。。。。。。。
                </Text>
              </VStack>
              <VStack alignItems="flex-start" fontSize="16px">
                <H2 fontSize="16px" mb="15px">文字文字:</H2>
                <Text>
                  介绍介绍介绍。。。。。。。。。。。
                </Text>
              </VStack>
            </Box>
          </div>
        </VStack>
      </UserCollectionContext.Provider>
    </Box>
  );
}

export default Content;
