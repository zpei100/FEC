

//No longer needed handler. This code is used to SSR. But proxy handles that now;

// app.get('/rooms/:id', function(req, res) {
//   //id defaults to 15 for development environment;
//   const userId = req.session.user ? req.session.user : 15;

//   try {
//     const id = parseInt(req.params.id);
//     if (typeof id !== 'number') throw new Error('id invalid');

//     Room.find({ id }).then(rooms => {
//       let relatedListings = [];
//       const room = rooms[0];
//       const related = room.related;
  
//       related.forEach((id, idx, related) => {
//         Room.find({ id }).then(rooms => {
//           relatedListings.push(rooms[0]);
//           if (relatedListings.length === related.length) {
//             User.find({ id: userId }).then(users => {
//               const { favorites, id, username } = users[0];
//               const user = {favorites, id, username }
//               const store = createStore(rootReducer, { room, relatedListings, user }, applyMiddleware(thunk));
//               const initialState = store.getState();
//               const content_one = renderToString(
//                 <Provider store={store}>
//                   <Gallery />
//                 </Provider>
//               );
  
//               const content_two = renderToString(
//                 <Provider store={store}>
//                   <RelatedListings />
//                 </Provider>
//               );
  
//               const html = template(initialState, content_one, content_two);
//               res.status(200).send(html);
//             }).catch(() => res.status(404));
//           }
//         }).catch(() => res.status(404));;
//       });
//     });
//   } catch(err) {
//     res.status(404)
//   }
// });

