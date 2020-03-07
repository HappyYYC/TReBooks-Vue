<template>
  <div>
    <Row class="expand-row">
      <Col>
        <span class="expand-key">File Name: </span>
        <span class="expand-value">{{ row.itemName }}</span>
      </Col>
    </Row>
    <Row>
      <Col>
        <span class="expand-key">Category: </span>
        <span class="expand-value">{{ row.category }}</span>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'ExpandRow',
  props: {
    row: Object
  }
}
</script>

<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
