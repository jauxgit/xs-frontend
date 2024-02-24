import { listTopInvokeInterfaceInfoUsingGET } from "@/services/xsapi-backend/analysisController";
import {
PageContainer
} from '@ant-design/pro-components';
import '@umijs/max';
import ReactECharts from 'echarts-for-react';
import React,{ useEffect,useState } from 'react';

/**
 * 接口分析
 * @constructor
 */
const InterfaceAnalysis: React.FC = () => {
  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      listTopInvokeInterfaceInfoUsingGET().then(r => {
        if (r.data) {
          setData(r.data);
          setLoading(true);
        }
      })
    } catch (e: any) {

    }
    // todo 从远程获取数组
  }, [])

  //映射{ value: 1048, name: 'Search Engine' },
  const chartData = data.map(item => {
    return {
      value: item.totalNum,
      name: item.name
    }
  })
  const option = {
    title: {
      text: '调用次数最多接口Top3',
      subtext: '调用次数',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '接口来源',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return <PageContainer>
    <ReactECharts loadingOption={{
      showLoading: loading
    }} option={option} />
  </PageContainer>;
};
export default InterfaceAnalysis;
