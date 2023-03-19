import { View, Text, FlatList,StyleSheet } from 'react-native'
import React ,{useState} from 'react'

export default function AllergieView() {
    const dataitem = [
        
        {
            "_id": {
              "$oid": "63fe10136e4172a6b0e2cf03"
            },
            "name": "produits laitiers ",
            "ingredients": [
              "Babeurre",
              "Benzoate de calcium",
              "Beurre",
              "Beurre concentré",
              "Calciumstearoylactylaat",
              "Caséinate",
              "Caséine",
              "Cheddar",
              "Concentré de lactosérum",
              "Concentré de protéines de lactosérum",
              "Cottage cheese",
              "Crème",
              "Crème chantilly",
              "Crème fouettée",
              "Crème fraiche",
              "E101",
              "E213",
              "E234",
              "E481",
              "E482",
              "E966",
              "Fromage",
              "Ghee",
              "Glycomacropeptide",
              "Grana padano",
              "Immunoglobuline",
              "Kéfir",
              "La glace",
              "Lactitol",
              "Lactose",
              "Lait",
              "Lait de beurre",
              "Lait de brebis",
              "Lait de chèvre",
              "Lait de vache",
              "Lait en poudre",
              "Lait écrémé",
              "Le lait écrémé en poudre",
              "Les solides du lait",
              "Margarine",
              "Matière grasse",
              "Matières grasses du lait",
              "Mozzarella",
              "Nisine",
              "Petit lait",
              "lactosérum",
              "Poudre de lactosérum",
              "Poudre de petit lait",
              "Protéine de lait hydrolysée",
              "Protéines du lait",
              "Sucre du lait",
              "Tagatose",
              "Yaourt"
            ]
          },
          {
            "_id": {
              "$oid": "63fe3caca9a9b3e923e4c360"
            },
            "name": "oeuf de poulet",
            "ingredients": [
              "Albumine",
              "Avidine",
              "Blanc d'oeuf",
              "Blanc d'oeuf de poulet",
              "Conalbumine",
              "Des oeufs",
              "E1105",
              "E322",
              "Gamme jaune d'oeuf de poule",
              "Globuline",
              "Jaune d'oeuf",
              "Lecithine",
              "Lipovitellin",
              "Livetine",
              "Lysozyme",
              "L'écithine d'oeuf",
              "Mayonnaise",
              "Oeuf",
              "oeuf de poules élevées en plein air",
              "Ovalbumine",
              "Ovo albumine",
              "Ovoglobuline",
              "Ovomucine",
              "Ovomucoïde",
              "Ovosucrol",
              "Ovotranfarine ",
              "Phosphatidylsérine",
              "Phospholipides ",
              "Phosvitine",
              "Poudre d'oeuf",
              "Poudre de protéine",
              "Protéine doeuf de poulet",
              "Oeuf d'animaux élevés en plein air"
            ]
          }
    ]
    const [data, setdata] = useState(dataitem);
    return (
        <View style={{flex: 1, height: "100%"}}>
            <FlatList
                style={styles.notificationList}
                data={data}
                keyExtractor={ item => item._id.$oid}
                renderItem={({item})=>{
                    return (
                        <Text style={styles.name}>{item.name}</Text>
                    )
                }}
            />
        </View>
    )

 
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
      },
    notificationList: {
        marginTop: 20,
        padding: 10,
        
        
      },
      name: {
        fontSize: 20,
        borderRadius:30,
        textAlignVertical:"center",
        height:50,
        alignItems:"center",
        width:300,
        color: '#000000',
        marginTop:10,
        marginLeft: 10,
        textAlign:"center",
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
    })