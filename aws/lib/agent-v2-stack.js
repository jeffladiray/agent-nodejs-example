const ec2 = require("aws-cdk-lib/aws-ec2");
const ecs = require("aws-cdk-lib/aws-ecs");
const ecs_patterns = require("aws-cdk-lib/aws-ecs-patterns");
const {Stack} = require("aws-cdk-lib");


class AgentV2Stack extends Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const vpc = new ec2.Vpc(this, "MyVpc");

        const cluster = new ecs.Cluster(this, "MyCluster", { vpc: vpc});

    // Create a load-balanced Fargate service and make it public
        new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService", {
            cluster: cluster, // Required
            cpu: 512, // Default is 256
            desiredCount: 1, // Default is 1
            taskImageOptions: {
                image: ecs.ContainerImage.fromRegistry("scra3/agent-v2"),
                containerPort: 3000
            },
            memoryLimitMiB: 2048, // Default is 512
            publicLoadBalancer: true, // Default is false
        });
    }
}

module.exports = { AgentV2Stack }
