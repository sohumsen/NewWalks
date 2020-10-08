const YourNavigator = () => (
    <AppStack.Navigator>
       <AppScreen.Screen name={"routeName"} component={AppContextWrapper}/>
    </AppStack.Navigator>
)
//   const AppContextWrapper = ({ navigation, route }) => (
//     <AppContext.Consumer>
//       {(other required prop) => (
//          <YourScreenComponent {...other required prop}/>
//       )}
//     </AppContext.Consumer>
//   );