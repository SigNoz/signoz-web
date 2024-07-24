import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Slider, Tooltip, SliderValue } from "@nextui-org/react";
import { ArrowUpRight } from 'lucide-react';
import Button from '@/components/Button/Button';

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
    window.location.hash = `#${id}`;
  }
};

const useHash = () => {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };
    
    setHash(window.location.hash);

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return hash;
};

const formatNumber = (number) => number.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 0 });

const formatBytes = (size) => {
  if (size < 1000) {
    return `${formatNumber(size)} GB`;
  }
  return `${formatNumber(size / 1000)} TB`;
};

const formatMetrics = (size) => {
  if (size < 1000) {
    return `${formatNumber(size)} mn`;
  }
  return `${formatNumber(size / 1000)} bn`;
};

// Transformation functions
const linearToLog = (value, minLog, maxLog) => {
  const minValue = Math.log(minLog);
  const maxValue = Math.log(maxLog);
  const scale = (maxValue - minValue) / (maxLog - minLog);
  return Math.floor(Math.exp(minValue + scale * (value - minLog)));
};

const logToLinear = (value, minLog, maxLog) => {
  const minValue = Math.log(minLog);
  const maxValue = Math.log(maxLog);
  const scale = (maxLog - minLog) / (maxValue - minValue);
  return Math.floor(minLog + scale * (Math.log(value) - minValue));
};

const MonthlyEstimate = () => {
  const TRACES_AND_LOGS_PRICES = {
    15: 0.3,
    30: 0.4,
    90: 0.6,
    180: 0.8,
  };
  const METRICS_PRICES = {
    1: 0.1,
    3: 0.12,
    6: 0.15,
    13: 0.18,
  };
  const RETENTION_PERIOD = {
    TRACES_AND_LOGS: [
      { days: 15, price: 0.3 },
      { days: 30, price: 0.4 },
      { days: 90, price: 0.6 },
      { days: 180, price: 0.8 },
    ],
    METRICS: [
      { months: 1, price: 0.1 },
      { months: 3, price: 0.12 },
      { months: 6, price: 0.15 },
      { months: 13, price: 0.18 },
    ],
  };

  const [tracesRetentionPeriod, setTracesRetentionPeriod] = useState(
    RETENTION_PERIOD.TRACES_AND_LOGS[0].days
  );
  const [logsRetentionPeriod, setLogsRetentionPeriod] = useState(
    RETENTION_PERIOD.TRACES_AND_LOGS[0].days
  );
  const [metricsRetentionPeriod, setMetricsRetentionPeriod] = useState(
    RETENTION_PERIOD.METRICS[0].months
  );

  const [tracesValue, setTracesValue] = React.useState<SliderValue>(2);
  const [inputTracesValue, setInputTracesValue] = React.useState<string>("2");

  const [logsValue, setLogsValue] = React.useState<SliderValue>(2);
  const [inputLogsValue, setInputLogsValue] = React.useState<string>("2");

  const [metricsValue, setMetricsValue] = React.useState<SliderValue>(2);
  const [inputMetricsValue, setInputMetricsValue] = React.useState<string>("2");

  const MIN_VALUE = 1;
  const MAX_VALUE = 200000;

  const handleChangeTraces = (value: SliderValue) => {
    if (isNaN(Number(value))) return;
    setTracesValue(value);
    setInputTracesValue(linearToLog(value, MIN_VALUE, MAX_VALUE).toString());
  };

  const handleChangeLogs = (value: SliderValue) => {
    if (isNaN(Number(value))) return;
    setLogsValue(value);
    setInputLogsValue(linearToLog(value, MIN_VALUE, MAX_VALUE).toString());
  };

  const handleChangeMetrics = (value: SliderValue) => {
    if (isNaN(Number(value))) return;
    setMetricsValue(value);
    setInputMetricsValue(linearToLog(value, MIN_VALUE, MAX_VALUE).toString());
  };

  const getPricePerUnit = (type: string, retentionPeriod: number) => {
    if (type === 'metrics') {
      return METRICS_PRICES[retentionPeriod];
    } else {
      return TRACES_AND_LOGS_PRICES[retentionPeriod];
    }
  };

  const calculateSubtotal = (type: string, value: SliderValue, retentionPeriod: number) => {
    const pricePerUnit = getPricePerUnit(type, retentionPeriod);
    const estimatedUsage = linearToLog(value, MIN_VALUE, MAX_VALUE);
    return Number(pricePerUnit) * Number(estimatedUsage);
  };

  const tracesSubtotal = calculateSubtotal('traces', tracesValue, tracesRetentionPeriod);
  const logsSubtotal = calculateSubtotal('logs', logsValue, logsRetentionPeriod);
  const metricsSubtotal = calculateSubtotal('metrics', metricsValue, metricsRetentionPeriod);

  const totalEstimate = Math.max(199, tracesSubtotal + logsSubtotal + metricsSubtotal);

  const myRef = useRef<HTMLElement | null>(null);

  const isHighVolume = totalEstimate >= 2500;

  const hash = useHash();

  useEffect(() => {
    const section = hash.replace("#", "");
    if (section) scrollToSection(section);
  }, [hash]);

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText("https://signoz.io/pricing/#estimate-your-monthly-bill");
  };

  return (
    <section ref={myRef} id="estimate-your-monthly-bill">
      <div className="section-container !w-[80vw] !mx-[auto] border border-signoz_slate-400 border-dashed !border-t-0">
        <div className="flex flex-col gap-2 pt-5">
          <span className="text-signoz_vanilla-100 text-2xl font-semibold pl-1 relative group">
            Estimate your monthly bill
            <a href="#estimate-your-monthly-bill" onClick={copyLinkToClipboard} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#4E74F8" className="w-6 h-6 linkicon">
                <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
                <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
              </svg>
            </a>
          </span>
          <span className="mb-16 text-signoz_vanilla-400 font-normal text-base pl-1">
            You can also set data ingestion limits so you never get a surprise bill.
            <span className="text-signoz_robin-400 font-medium">
              <Link href={"https://signoz.io/docs/ingestion/signoz-cloud/keys/"}>
                &nbsp;Learn more
                <ArrowUpRight className="inline" size={16} />
              </Link>
            </span>
          </span>
        </div>
        <div className="grid grid-cols-6 grid-rows-4 gap-y-4">
          <div className="p-2"></div>
          <div className="py-2 pr-2 uppercase text-[13px] font-semibold text-signoz_vanilla-400">
            Pricing per unit
          </div>
          <div className="py-2 pr-2 uppercase text-[13px] font-semibold text-signoz_vanilla-400">
            Retention
          </div>
          <div className="py-2 pr-2 uppercase text-[13px] font-semibold text-signoz_vanilla-400">
            Scale of ingestion (per month)
          </div>
          <div className="py-2 pr-2 uppercase text-[13px] font-semibold text-signoz_vanilla-400 text-right">
            Estimated usage
          </div>
          <div className="py-2 pr-2 uppercase text-[13px] font-semibold text-signoz_vanilla-400 text-right">
            Subtotal
          </div>

          <div className="flex p-2 gap-2 metrics-background items-center">
            <img src="/img/index_features/drafting-compass.svg" alt="Logs Icon" className="w-6 h-6" />
            Traces
          </div>
          <div className="flex items-center justify-left gap-1 metrics-background">
            <span className="text-base font-medium text-signoz_robin-400">
              ${TRACES_AND_LOGS_PRICES[tracesRetentionPeriod]}
            </span>
            /GB
          </div>
          <div className="flex metrics-background items-center">
            <select
              className="block w-[100px] h-[32px] rounded-sm border border-signoz_slate-400 p-0.5 text-xs text-signoz_vanilla-100 placeholder-gray-400 accent-primary-400 bg-signoz_ink-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
              value={tracesRetentionPeriod}
              onChange={(e) => setTracesRetentionPeriod(Number(e.target.value))}
            >
              {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                <option key={`${option.days}-${idx}`} value={option.days}>
                  {`${option.days} days`}
                </option>
              ))}
            </select>
          </div>
          <div className='flex items-center metrics-background'>
            <Slider
              size="sm"
              step={0.01}
              maxValue={MAX_VALUE}
              minValue={MIN_VALUE}
              showTooltip={true}
              tooltipProps={{
                content: formatBytes(linearToLog(tracesValue, MIN_VALUE, MAX_VALUE))
              }}
              color="secondary"
              marks={[
                {
                  value: MIN_VALUE,
                  label: "0GB",
                },
                {
                  value: MAX_VALUE,
                  label: "200TB",
                },
              ]}
              classNames={{
                base: "max-w-md",
                label: "text-medium",
              }}
              renderThumb={(props) => (
                <div
                  {...props}
                  className="group top-1/2 bg-background border-small border-signoz_vanilla-100 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                >
                  <span className="transition-transform bg-signoz_robin-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                </div>
              )}
              renderValue={({ children, ...props }) => (
                <output {...props}>
                  <Tooltip
                    className="text-tiny text-default-500 rounded-md"
                  >
                    <input
                      className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                      type="text"
                      value={inputTracesValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const v = e.target.value;
                        setInputTracesValue(v);
                      }}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter" && !isNaN(Number(inputTracesValue))) {
                          setTracesValue(logToLinear(Number(inputTracesValue), MIN_VALUE, MAX_VALUE));
                        }
                      }}
                    />
                  </Tooltip>
                </output>
              )}
              value={tracesValue}
              onChange={handleChangeTraces}
            />
          </div>

          <div className="p-2 metrics-background text-right text-signoz_vanilla-400">{formatBytes(linearToLog(tracesValue, MIN_VALUE, MAX_VALUE))}</div>
          <div className="p-2 metrics-background text-right">${formatNumber(tracesSubtotal)}</div>

          <div className="flex p-2 gap-2 metrics-background items-center">
            <img src="/img/index_features/logs.svg" alt="Logs Icon" className="w-6 h-6" />
            Logs
          </div>
          <span className="flex items-center justify-left gap-1 metrics-background">
            <span className="text-base font-medium text-signoz_sakura-400">
              ${TRACES_AND_LOGS_PRICES[logsRetentionPeriod]}
            </span>
            /GB
          </span>
          <div className="flex metrics-background items-center">
            <select
              className="block w-[100px] h-[32px] rounded-sm border border-signoz_slate-400 p-0.5 text-xs text-signoz_vanilla-100 placeholder-gray-400 accent-primary-400 bg-signoz_ink-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
              value={logsRetentionPeriod}
              onChange={(e) => setLogsRetentionPeriod(Number(e.target.value))}
            >
              {RETENTION_PERIOD.TRACES_AND_LOGS.map((option, idx) => (
                <option key={`${option.days}-${idx}`} value={option.days}>
                  {`${option.days} days`}
                </option>
              ))}
            </select>
          </div>
          <div className='flex items-center metrics-background'>
            <Slider
              size="sm"
              step={0.01}
              maxValue={MAX_VALUE}
              minValue={MIN_VALUE}
              showTooltip={true}
              tooltipProps={{
                content: formatBytes(linearToLog(logsValue, MIN_VALUE, MAX_VALUE))
              }}
              color="danger"
              marks={[
                {
                  value: MIN_VALUE,
                  label: "0GB",
                },
                {
                  value: MAX_VALUE,
                  label: "200TB",
                },
              ]}
              classNames={{
                base: "max-w-md",
                label: "text-medium",
              }}
              renderThumb={(props) => (
                <div
                  {...props}
                  className="group top-1/2 bg-background border-small border-signoz_vanilla-100 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                >
                  <span className="transition-transform bg-signoz_sakura-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                </div>
              )}
              renderValue={({ children, ...props }) => (
                <output {...props}>
                  <Tooltip
                    className="text-tiny text-default-500 rounded-md"
                  >
                    <input
                      className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                      type="text"
                      value={inputLogsValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const v = e.target.value;
                        setInputLogsValue(v);
                      }}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter" && !isNaN(Number(inputLogsValue))) {
                          setLogsValue(logToLinear(Number(inputLogsValue), MIN_VALUE, MAX_VALUE));
                        }
                      }}
                    />
                  </Tooltip>
                </output>
              )}
              value={logsValue}
              onChange={handleChangeLogs}
            />
          </div>

          <div className="p-2 metrics-background text-right text-signoz_vanilla-400">{formatBytes(linearToLog(logsValue, MIN_VALUE, MAX_VALUE))}</div>
          <div className="p-2 metrics-background text-right">${formatNumber(logsSubtotal)}</div>

          <div className="flex p-2 gap-2 metrics-background items-center">
            <img src="/img/index_features/bar-chart-2.svg" alt="Logs Icon" className="w-6 h-6" />
            Metrics
          </div>
          <span className="flex items-center justify-left gap-1 metrics-background">
            <span className="text-base font-medium text-signoz_amber-400">
              ${METRICS_PRICES[metricsRetentionPeriod]}
            </span>
            / mn samples
          </span>
          <div className="flex metrics-background items-center">
            <select
              className="block w-[100px] h-[32px] rounded-sm border border-signoz_slate-400 p-0.5 text-xs text-signoz_vanilla-100 placeholder-gray-400 accent-primary-400 bg-signoz_ink-400 focus:border-primary-500 focus:ring-primary-500 md:p-1 md:text-sm"
              value={metricsRetentionPeriod}
              onChange={(e) => setMetricsRetentionPeriod(Number(e.target.value))}
            >
              {RETENTION_PERIOD.METRICS.map((option, idx) => (
                <option key={`${option.months}-${idx}`} value={option.months}>
                  {`${option.months} ${option.months === 1 ? 'month' : 'months'}`}
                </option>
              ))}
            </select>
          </div>
          <div className='flex items-center metrics-background'>
            <Slider
              size="sm"
              step={0.01}
              maxValue={MAX_VALUE}
              minValue={MIN_VALUE}
              showTooltip={true}
              tooltipProps={{
                content: formatMetrics(linearToLog(metricsValue, MIN_VALUE, MAX_VALUE))
              }}
              color="warning"
              marks={[
                {
                  value: MIN_VALUE,
                  label: "0M",
                },
                {
                  value: MAX_VALUE,
                  label: "200B",
                },
              ]}
              classNames={{
                base: "max-w-md",
                label: "text-medium",
              }}
              renderThumb={(props) => (
                <div
                  {...props}
                  className="group top-1/2 bg-background border-small border-signoz_vanilla-100 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                >
                  <span className="transition-transform bg-signoz_amber-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                </div>
              )}
              renderValue={({ children, ...props }) => (
                <output {...props}>
                  <Tooltip
                    className="text-tiny text-default-500 rounded-md"
                  >
                    <input
                      className="px-1 py-0.5 w-12 text-right text-small text-default-700 font-medium bg-default-100 outline-none transition-colors rounded-small border-medium border-transparent hover:border-primary focus:border-primary"
                      type="text"
                      value={inputMetricsValue}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const v = e.target.value;
                        setInputMetricsValue(v);
                      }}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter" && !isNaN(Number(inputMetricsValue))) {
                          setMetricsValue(logToLinear(Number(inputMetricsValue), MIN_VALUE, MAX_VALUE));
                        }
                      }}
                    />
                  </Tooltip>
                </output>
              )}
              value={metricsValue}
              onChange={handleChangeMetrics}
            />
          </div>

          <div className="p-2 metrics-background text-right text-signoz_vanilla-400">{(formatMetrics(linearToLog(metricsValue, MIN_VALUE, MAX_VALUE)))}</div>
          <div className="p-2 metrics-background text-right">${formatNumber(metricsSubtotal)}</div>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 button-background px-3 py-4 border border-transparent rounded-md">
          <span className="text-signoz_vanilla-100 text-base font-medium">
            Monthly estimate for usage-based plan
          </span>
          <div className="w-3/5 border-b border-signoz_slate-400 border-dashed" />
          <div>${formatNumber(totalEstimate)}</div>
        </div>
        <div className={`flex justify-between items-center mt-3 mb-6 px-3 py-4 bg-[#4E74F81A] border border-dashed rounded-md ${isHighVolume ? 'border-signoz_robin-500' : 'border-transparent'}`}>
          <span className="text-signoz_vanilla-100 text-base font-medium">
            Reach out to us for custom pricing and retention for high volume
          </span>
          <div className="w-2/5 border-b border-signoz_slate-400 border-dashed" />
          <Button>
            <Link href={'https://share.hsforms.com/1AZy88ajlRsCPZUP0kSMb2gda5af'} className='flex-center'>
              Contact us
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MonthlyEstimate;
