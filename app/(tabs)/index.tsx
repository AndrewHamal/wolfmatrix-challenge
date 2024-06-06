import { View, Pressable } from 'react-native';
import useSWR from 'swr'
import Input from '@/components/Input';
import { AntDesign, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import fetcher from '@/api';
import ItemList from '@/components/ItemList';
import { useState } from 'react';
import Empty from '@/components/Empty';

export default function HomeScreen() {
  const [keyword, setKeyword] = useState('');
  const [selectedItem, setSelectedItem] = useState([]);
  const { data } = useSWR('https://jsonplaceholder.typicode.com/todos', fetcher);

  return (
    <SafeAreaView className='bg-white'>
      <View className='h-screen w-screen px-4'>
        <Input
          label={''}
          enableClear={true}
          value={keyword}
          onChangeText={setKeyword}
          placeholder='Search by Keyword'
          returnKeyType='done'
          LeftComponent={() => <Feather name="search" color={'#64b5f6'} size={20} className='' />}
          RightComponent={() => <Pressable onPress={() => setKeyword('')} className="absolute right-2">
            <AntDesign name="closecircle" size={20} />
          </Pressable>}
        />

        {/* reason for using flashlist over flatlist is performance. benchmark shows flashlist is 7.5x faster than flatlist  */}
        {/* if i have to do keyword search in RESTFUL api i would use debounce  */}
        {/* im directly using filter in data props because swr pulls data one time and keeps it on cache which wont cause memory leak even if i use filter directly */}
        <FlashList
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(item: any) => item.id}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={data?.data?.length || 100}
          contentContainerStyle={{ paddingBottom: 150, paddingTop: 15 }}
          data={data?.data?.filter((res: any) => res.title.toLowerCase().match(keyword.toLowerCase()))}
          renderItem={({ item }: any) => <ItemList selectedItem={selectedItem} setSelectedItem={setSelectedItem} item={item} />}
        />
      </View>
    </SafeAreaView>
  );
}