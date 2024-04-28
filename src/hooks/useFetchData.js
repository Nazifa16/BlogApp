import { useEffect, useState } from "react";

export const useFetchData = ({
  requestFunc,
  dependency = [],
  condition,
  onSucsses,
  onError,
}) => {
  //obyekt veririk
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    if (condition) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await requestFunc();

        setData(res.data);
        onSucsses?.(res.data);
      } catch (err) {
        setError(err);
        onError?.(err);
      } finally {
        // setError(false);
        setLoading(false);
      }
    };
    fetchData();
  }, [...dependency]);

  return { data, loading, error, setData, setLoading, setError };
};
