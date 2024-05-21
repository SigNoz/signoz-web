<div>
In this section, we will see how to send data from applications deployed in ECS to
SigNoz {props.name} using Daemon Service we created in the previous section.
</div>
<br/>

### Step 1: Add OpenTelemetry Instrumentation to your Application

To add OpenTelemetry instrumentation to your application, you can follow the
docs [here](https://signoz.io/docs/instrumentation/).

:::note
This step include adding the [OpenTelemetry SDK](https://opentelemetry.io/docs/instrumentation/)
as well as the initialization code to your application codebase and rebuilding the application
container image.
:::

### Step 2: Add Entrypoint to your Application Container

We need to add an entrypoint to the application container to set the
`OTEL_EXPORTER_OTLP_ENDPOINT` environment variable to the endpoint of the
daemon service. Such that the application container can send data to the
daemon container running in the same host.