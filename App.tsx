import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

type Produto = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

type Dados ={
  
  products:Produto[];

}

export default function App() {
  const[produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(()=>{
    carregarProdutos();
  },[]);

  async function carregarProdutos() {
    const res = await fetch('https://dummyjson.com/products');
    const dados: Dados = await res.json();
    setProdutos(dados.products);
  }

  return (
    <View style={styles.container}>
      <FlatList
      data={produtos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
          <Image source={{uri: item.thumbnail}} style={{ width: 100, height: 100 }}/>
          <Text>{item.title}</Text>
          <Text>$ {item.price}</Text>
        </View>
      ) }

      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  texto: {
    fontSize: 30,
    color:"red",
  }
});
