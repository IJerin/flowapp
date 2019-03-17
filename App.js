
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationScreenProps, NavigationEventSubscription } from 'react-navigation';

type Props = {
  onNewTotal: number
};

type State = {
  entries: object,
};

class App extends React.PureComponent<Props, NavigationScreenProps<{}>, State> {
  focusSubscription: NavigationEventSubscription | null = null;

  state: State = {
    isVisible: false,
    entries: {},
  };

  componentDidMount() {
   // alert(JSON.stringify(this.props))
   // this.focusSubscription = this.props.navigation.addListener('willFocus', () => console.log('will focus'));
   this.onFocus()
  }

  onFocus = () => {
    this.setState({ isVisible: true });
    this.fetch();
  }
  async fetch() {
    const entries = this.loadData();
    this.setState({ entries });
    this.notify();
  }
  loadData() {
    return new Promise((resolve) => window.setTimeout(() => resolve([1, 2, 3]), 1500));
  }
  notify() {
    let total = 0;
    for (let i = 0; i < this.state.entries.length; i++) {
      total += this.state.entries[i];
    }

    this.props.onNewTotal= total;
  }

  render() {
    const entries = this.state.entries;
    const isVisible = this.state.isVisible;
    const containerStyles = {
      ...styles.container,
      ...(isVisible ? styles.containerVisible : {}),
    };
    if (!isVisible) return <View style={ containerStyles } />;
    alert(JSON.stringify(entries))
    return (
      <View style={ containerStyles }>
      <Text>My pretty view:</Text>
        
        <Text style={ [styles.title] }>
          Entries:
            {
              
              Object.keys(entries).map((entry, key) =>( <Text key={key} >{entry} </Text>))
            }
            </Text>
             <Text style={ [styles.title] }>
            values:
            {
              
              Object.values(entries).map((entry, key) =>( <Text key={key} >{ entry } </Text>))
            } 
        </Text>
      </View>
    );
  }
}

type Styles = {
  style?: StyleSheet.Styles | Array<StyleSheet.Styles>
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: 'red',
    backgroundColor: 'silver',
    color: 'pink',
    opacity: 0.5,
  },
  containerVisible: {
    opacity: 1,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 15,
    marginRight: 0
  },
});

export default App;
