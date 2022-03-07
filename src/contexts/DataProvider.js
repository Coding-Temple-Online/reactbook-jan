import { getDocs, getDoc, getFirestore, query, collectionGroup, collection, addDoc, orderBy, doc, updateDoc, setDoc } from "firebase/firestore";
import { createContext, useCallback, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";

export const DataContext = createContext()

export const DataProvider = (props) =>
{

    const [ posts, setPosts ] = useState([])
    const [cart, setCart] = useState({ items: [], quantity: 0, subtotal: 0, tax: 0, grandtotal: 0 })
    const { currentUser } = useAuth()
    const [ products, setProducts ] = useState([])
    
    const db = getFirestore()

    // this needs to be async, because it needs to pull asynchronous data from Firebase
    const getCart = async () => {
        // check if there's a logged-in user
        if ( currentUser.id ) {
            let cartQuantity = 0;
            let subtotal = 0;
            let tax = 0;

            const userCartCollection = collection( db, 'users', currentUser.id, 'cart' )

            // get access to the user's cart collection
            const querySnapshot = await getDocs( userCartCollection )

            let productList = []

            querySnapshot.forEach( doc => {
                fetch( `https://fakebook-january-derek.herokuapp.com/api/v1/products/${ doc.id }` )
                    .then( res => res.json() )
                    .then( data => {
                        // increment the cart's quantity by the product's quantity
                        cartQuantity+=doc.data().quantity

                        // add the data to the products list, including its quantity
                        productList.push( { ...data, quantity: doc.data().quantity } )

                        // incremement the ccart's subtotal by the product's price * its quantity
                        subtotal += data.price * doc.data().quantity

                        // implement tax totals
                        // tax += whatever you defined in stripe

                        setCart({
                            items: [ ...productList ],
                            quantity: cartQuantity,
                            subtotal: subtotal.toFixed( 2 ),
                            // grandtotal: ( (subtotal + tax).toFixed( 2 ) ),
                            grandtotal: ( subtotal.toFixed( 2 ) ),
                        })
                    } )
            } )

        }
    }

    const addToCart = useCallback(
      async ( productData ) => {
        // if current user is logged in
        if ( currentUser.id ) {
            // access user's cart product from their collection
            const productRef = doc( db, 'users', currentUser.id, 'cart', productData.id )

            // find the product
            const productDoc = await getDoc( productRef )

            // if the product does not exist
            if ( !productDoc.exists() ) {
                // add the product's info to the Firebsae database at that user's cart collection
                // and set the product's quantity to 1
                await setDoc( productRef, { quantity: 1 } )
            }
            else {
                // increment the product's quantity by 1
                let quantity = productDoc.data().quantity
                quantity++;

                await updateDoc( productRef, { quantity: Number( quantity ) }, { merge: true } )
            }
        }

        // retrieve our new cart state from the database
        getCart()

      },
      [ db, currentUser.id ],
    )
    

    useEffect(() => {
        getCart()
    }, [ currentUser.id ])
    

    const getProducts = () =>
    {
        fetch('https://fakebook-january-derek.herokuapp.com/api/v1/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }

    useEffect(() =>
    {
        getProducts()
    }, [])

    // loop over posts collection and setPosts
    const getPosts = useCallback(
        async () =>
        {
            // const q = query(collectionGroup(db, 'posts'))

            // When making custom Firebase index queries, create your own custom one here: https://console.firebase.google.com/project/reactbook-jan-derek/firestore/indexes/single-field/manage
            // CUSTOM INDEX QUERY DOCUMENTATION: https://firebase.google.com/docs/firestore/query-data/indexing?authuser=0&hl=en
            const q = query( 
                collectionGroup( db, 'posts' ),
                orderBy( 'dateCreated', 'desc' ) 
            ) 

            const querySnapshot = await getDocs(q)

            let newPosts = [];
            querySnapshot.forEach(async doc =>
            {
                const userRef = await getDoc(doc.ref.parent.parent);
                // console.log(userRef.data())

                newPosts.push({
                    id: doc.id,
                    ...doc.data(),
                    user: {
                        id: userRef.id,
                        ...userRef.data()
                    }
                })
                setPosts( posts.concat(newPosts) )
            })

            return querySnapshot;
        },
        [ db ],
    )

    const addPost = async (formData) =>
    {
        let collectionRef = await collection(db, `users/${ currentUser.id }/posts`)

        // once we try to add the new document to firebase, we can grab all of its information here
        // await addDoc(collectionRef, formData)
        const docRef = await addDoc( collectionRef, formData )

        // after we created a new document inside Firebase, we can then grab it using getDoc
        const newDoc = await getDoc( docRef )

        // get access to the deeply nested document's current user and grab their data so we can use it to pass into our new posts list
        const userRef = await getDoc( docRef.parent.parent )

        setPosts([ 
            { 
                id: newDoc.id,
                ...newDoc.data(),
                user: {
                    id: currentUser.id,
                    ...userRef.data()
                }

            },
            ...posts
        ])
    }


    useEffect(() =>
    {
        getPosts()
    }, [ getPosts ])

    // useEffect(() => {
    //     console.log(firebaseApp)
    // }, [])

    const values = {
        posts, setPosts, addPost, products, cart, addToCart
    }

    return (
        <DataContext.Provider value={values} >
            {props.children}
        </DataContext.Provider>
    )
}