import React from 'react';
import { Tree, Input } from 'antd';
import cFetch from '../../utils/Cfetch';

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

/*const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};*/
//generateData(z);

const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};


const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};


export default class Archivo extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      gData:[]
    }
  }

  componentDidMount(){
    cFetch("http://192.168.10.189:3001/archivo")
    .then((res) => {
      const jsonArchivo = [];
      delete res.result;
      for (const key in res) {
        if (res.hasOwnProperty(key)) {
          const element = res[key];
          jsonArchivo.push(element)
        }
      }
      this.setState({gData:jsonArchivo});
      generateList(jsonArchivo)
    })
    .catch(err => {
      console.log("error",err);
    })
  }
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onChange = (e) => {
    const value = e.target.value;
    const {gData} = this.state;
    const expandedKeys = dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, gData);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  }
  onSelectTreeNode = (selectedKeys,e) => {
    console.log(selectedKeys,"on clik nodeeee",e.node)
    console.log(e.selectedNodes)
  }

  render() {
    const { searchValue, expandedKeys, autoExpandParent, gData } = this.state;
    console.log("la data", gData)
    const loop = data => data.map((item) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{item.title}</span>;
      if (item.children) {
        return (
          <TreeNode key={item.key} title={title} otherpro={`xxx${index}`}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={title} />;
    });
    return (
      <div>
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <Tree
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onSelect={this.onSelectTreeNode}
        >
          {loop(gData)}
        </Tree>
        <div>
        </div>
      </div>
    );
  }
}
