const MiniBrand = require('../models/MiniBrand')

const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLList, 
    GraphQLNonNull,
    GraphQLEnumType,
    GraphQLInt, 
} = require('graphql')

//MBS1 Type
const MiniBrandType = new GraphQLObjectType({
    name: 'MiniBrand',
    fields: () => ({
        id: { type: GraphQLID},
        set: { type: GraphQLString },
        setName: { type: GraphQLString },
        seriesNo: { type: GraphQLInt },
        item: { type: GraphQLString },
        itemNo: { type: GraphQLInt },
        itemName: { type: GraphQLString },
        brandName: { type: GraphQLString },
        image: { type: GraphQLString },
        rarity: { type: GraphQLString },
        specialFeature: { type: GraphQLString },
    }),
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        miniBrand: {
            type: MiniBrandType,
            args: { id: {type: GraphQLID } },
            resolve(parent, args){
                return MiniBrand.findById(args.id)
            }
        }
    }
})

//Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //Add client
        addMiniBrand: {
            type: MiniBrandType,
            args: {
                set: { type: GraphQLNonNull(GraphQLString)},
                setName: { type: GraphQLNonNull(GraphQLString)},
                seriesNo: { type: GraphQLNonNull(GraphQLInt)},
                item: { type: GraphQLNonNull(GraphQLString)},
                itemNo: { type: GraphQLNonNull(GraphQLInt)},
                itemName: { type: GraphQLNonNull(GraphQLString)},
                brandName: { type: GraphQLNonNull(GraphQLString)},
                image: { type: GraphQLNonNull(GraphQLString)},
                rarity: { type: GraphQLNonNull(GraphQLString)},
                specialFeature: { type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                const miniBrand = new MiniBrand({
                    set: args.set,
                    setName: args.setName,
                    seriesNo: args.seriesNo,
                    item: args.item,
                    itemNo: args.itemNo,
                    itemName: args.itemName,
                    brandName: args.brandName,
                    image: args.image,
                    rarity: args.rarity,
                    specialFeature: args.specialFeature,
                })

                return miniBrand.save()
            }
        },
        },
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
})