### Step 3: Create Daemon Service

Now configure the daemon service you created in Step 1 with the OpenTelemetry Collector (OTelCollector) configuration you prepared and stored in AWS Parameter Store in Step 2. The goal is to ensure the daemon service is properly set up to collect, process, and export your ECS infrastructure metrics and logs to SigNoz Cloud.

As a first step to configure the daemon service, you need to set the environment variable by running the command (using your AWS CLI) below:

```bash
export CLUSTER_NAME=<YOUR-ECS-CLUSTER-NAME>
export REGION=<YOUR-ECS-REGION>
export COMMAND=--config=env:SIGNOZ_CONFIG_CONTENT
export SIGNOZ_CONFIG_PATH=/ecs/signoz/otelcol-daemon.yaml
```

Where,
`<YOUR-ECS-CLUSTER-NAME>` -  Name of your ECS cluster. For example, `my-test-cluster`
`<YOUR-ECS-REGION>` - Region in which your ECS cluster is running. For example, `us-east-1`

:::note
Make sure you have `CLUSTER_NAME` and `REGION` environment variables set to the proper values before running any `aws` commands.
:::

Now with the environment variables set, you proceed to run an AWS CloudFormation command to create the stack that represents your daemon service. This command uses the aws `cloudformation create-stack` for creating a new stack.

Now run the following command (using your AWS CLI) to create the daemon service:

```bash
aws cloudformation create-stack --stack-name AOCECS-daemon-${CLUSTER_NAME}-${REGION} \
    --template-body file://daemon-template.yaml \
    --parameters ParameterKey=ClusterName,ParameterValue=${CLUSTER_NAME} \
    ParameterKey=CreateIAMRoles,ParameterValue=True \
		ParameterKey=command,ParameterValue=${COMMAND} \
		ParameterKey=SigNozConfigPath,ParameterValue=${SIGNOZ_CONFIG_PATH} \
    --capabilities CAPABILITY_NAMED_IAM \
    --region ${REGION}
```

### Step 4: Verify Daemon Service

To verify that the daemon service is running, you can run the following command:

```bash
aws ecs list-tasks --cluster ${CLUSTER_NAME} --region ${REGION}
```

You should see the task ARN of the daemon service in the output.

### Step 5: Verify Data in SigNoz

<div>
To verify that the data is being sent to SigNoz {props.name}, you can go to the dashboard section of SigNoz and import one of the follwing dashboards below:
</div>
<br/>

- [instance-metrics.json](https://github.com/SigNoz/dashboards/raw/chore/ecs-dashboards/ecs-infra-metrics/instance-metrics.json)
- [hostmetrics-with-variable.json](https://github.com/SigNoz/dashboards/raw/main/hostmetrics/hostmetrics-with-variable.json)

Now, you should see the metrics for your ECS cluster in the dashboard.

### (Optional) Step 6: Clean Up

In a cloud environment where resources are billed based on usage, cleaning up resources is crucial. This step involves removing the daemon service and any associated resources that were created during the setup process to collect and forward metrics and logs from your ECS infrastructure to SigNoz. To clean up the daemon service, you can run the following command:

```bash
aws cloudformation delete-stack --stack-name AOCECS-daemon-${CLUSTER_NAME}-${REGION} --region ${REGION}
```